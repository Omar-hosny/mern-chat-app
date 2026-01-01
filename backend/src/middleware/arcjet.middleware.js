import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../lib/arcjet.js";

/**
 * Middleware to protect routes using Arcjet.
 * It handles rate limiting, bot detection, and spoofed bot detection.
 */
export const arcjetProtection = async (req, res, next) => {
  try {
    // Request a decision from Arcjet based on the incoming request
    const decision = await aj.protect(req);

    // If the request is denied, handle the specific reason
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Rate limit exceeded. Please try again later." });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied." });
      } else {
        return res.status(403).json({
          message: "Access denied by security policy.",
        });
      }
    }

    // Check if any of the results indicate a spoofed bot (e.g., a bot pretending to be Googlebot)
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }

    // If no threats are detected, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error and allow the request to proceed (fail-open strategy)
    console.log("Arcjet Protection Error:", error);
    next();
  }
};
