import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
// get all contacts controller
export const getAllContacts = async (req, res) => {
  try {
    const loggenInUser = req.user._id;
    if (!loggenInUser) {
      res.status(401).json({ message: "Unauthorized..." });
    }
    const contacts = await User.find({ _id: { $ne: loggenInUser } }).select(
      "-__v -password"
    );
    res.status(200).json(contacts);
  } catch (error) {
    console.log("Internal server error ");
    res.status(500).json({ message: "Internal server error" });
  }
};

// get chets between loggedInUser and all contacts controller
export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user?._id;

    if (!loggedInUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // get all messages between loggedInUser and all contacts
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    })
      .populate("senderId", "name avatar") // populate senderId with name and avatar
      .populate("receiverId", "name avatar") // populate receiverId with name and avatar
      .sort({ createdAt: -1 }); // newest first

    // create a map of partners (to avoid duplicates)
    const partnersMap = new Map();

    // loop through messages
    messages.forEach((message) => {
      // get partner
      const partner =
        message.senderId._id.toString() === loggedInUserId.toString()
          ? message.receiverId
          : message.senderId;

      // add partner to map if not already added
      if (!partnersMap.has(partner._id.toString())) {
        partnersMap.set(partner._id.toString(), {
          _id: partner._id,
          name: partner.name,
          avatar: partner.avatar ?? "",
          lastMessageAt: message.createdAt,
        });
      }
    });

    // return partners as array
    res.status(200).json([...partnersMap.values()]);
  } catch (error) {
    console.error("getChatPartners error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// send message controller
export const sendMessage = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    if (!loggedInUser) {
      res.status(401).json({ message: "Unauthorized..." });
    }
    const receiverId = req.params.id;
    const { text, image } = req.body;

    if (!receiverId) {
      res.status(400).json({ message: "Bad request missing receiverId..." });
    }

    if (!text && !image) {
      res.status(400).json({ message: "Bad request missing text or image..." });
    }

    // check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      res.status(404).json({ message: "Receiver not found..." });
    }

    // check if receiver is loggedInUser
    if (receiver._id.toString() === loggedInUser.toString()) {
      res
        .status(400)
        .json({ message: "You cannot send message to yourself..." });
    }
    // upload image to cloudinary if image is provided

    let imageUrl = null;
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "chat-app",
      });
      imageUrl = result.secure_url;
    }

    const message = await Message.create({
      senderId: loggedInUser,
      receiverId,
      text,
      image: imageUrl,
    });

    // 4. Populate name and avatar of senderId and receiverId
    const populatedMessage = await message.populate([
      { path: "senderId", select: "name avatar" },
      { path: "receiverId", select: "name avatar" },
    ]);

    // --- REAL-TIME LOGIC ---
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      // io.to(socketId).emit() sends only to that specific user
      io.to(receiverSocketId).emit("new-message", populatedMessage);
    }
    res.status(200).json(populatedMessage);
  } catch (error) {
    console.log("Internal server error ");
    res.status(500).json({ message: "Internal server error" });
  }
};

// get chat by partnerId controller
export const getChatByPartnerId = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    if (!loggedInUser) {
      res.status(401).json({ message: "Unauthorized..." });
    }
    const partnerId = req.params.id;
    if (!partnerId) {
      res.status(400).json({ message: "Bad request missing partnerId..." });
    }
    const chat = await Message.find({
      $or: [
        { senderId: loggedInUser, receiverId: partnerId },
        { senderId: partnerId, receiverId: loggedInUser },
      ],
    })
      .populate("senderId", "name avatar _id")
      .populate("receiverId", "name avatar _id")
      .sort({ createdAt: 1 })
      .select("-__v");
    res.status(200).json(chat);
  } catch (error) {
    console.log("Internal server error ");
    res.status(500).json({ message: "Internal server error" });
  }
};
