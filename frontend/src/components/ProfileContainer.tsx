import { Button } from "./ui/button";
import { useRef, useState } from "react";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { Loader2, Upload } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProfileContainer = () => {
  const { authUser } = useAuthStore();
  console.log(authUser);
  const uploadRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(authUser?.avatar || null);
  const { updateProfileFn, isLoading } = useUpdateProfile();

  const handleOnchange = () => {
    if (!uploadRef.current?.files?.[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setAvatar(result);
    };
    reader.readAsDataURL(uploadRef.current.files[0]);
  };

  const handleUpdateProfile = () => {
    if (!avatar) return;
    updateProfileFn(avatar);
  };

  const createdAt = authUser?.createdAt
    ? new Date(authUser?.createdAt).toLocaleString()
    : "";
  return (
    <div className="flex items-center flex-col gap-2 p-3 mt-30 bg-white rounded-2xl ">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 relative">
          <img
            src={avatar || authUser?.avatar || "/noavatar.png"}
            alt="profile"
            className="w-16 h-16 rounded-full"
          />
        </div>
        <div className="flex flex-col p-5">
          <h1 className="text-2xl font-bold">{authUser?.name}</h1>
          <p className="text-gray-700">{authUser?.email}</p>
          <p className="text-gray-400 text-sm">Created at: {createdAt}</p>

          <div className="flex items-center gap-2 mt-2">
            <input
              ref={uploadRef}
              className="hidden"
              type="file"
              name="upload"
              id="upload"
              accept="image/*"
              onChange={handleOnchange}
            />
            <Button
              className="bg-gray-100 hover:bg-gray-200 text-sm"
              onClick={() => uploadRef.current?.click()}
              disabled={isLoading}
            >
              select image
            </Button>
          </div>
        </div>
      </div>
      <Button
        className="bg-blue-300 hover:bg-blue-400 text-sm w-full"
        disabled={isLoading || !avatar}
        onClick={handleUpdateProfile}
      >
        {isLoading ? "Updating..." : "Update"}
        {isLoading ? <Loader2 className="animate-spin" /> : <Upload />}
      </Button>
    </div>
  );
};

export default ProfileContainer;
