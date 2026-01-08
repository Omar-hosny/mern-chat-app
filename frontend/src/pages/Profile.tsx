import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import ProfileContainer from "../components/ProfileContainer";

const Profile = () => {
  return (
    <div className="flex w-full bg-rose-50 flex-col items-center justify-center h-full">
      <div
        className="flex w-full self-start justify-start h-18 items-center
       gap-2 bg-teal-500 p-3"
      >
        <Link to="/" className="flex items-center gap-2 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
          Back
        </Link>
      </div>
      <div className="flex flex-col items-center justify-start h-full">
        {/* profile container */}
        <ProfileContainer />
      </div>
    </div>
  );
};

export default Profile;
