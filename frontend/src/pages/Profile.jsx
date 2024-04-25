import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.userSlice);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <img
          className="rounded-full"
          src={user?.avatar?.url || "../images/default_avatar.jpg"}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div>
          <p className="text-xl font-bold text-slate-500">Full Name</p>
          <h2 className="text-lg font-semibold mb-4">{user?.name}</h2>
        </div>
        <div>
          <p className="text-xl font-bold text-slate-500">Email Address</p>
          <h2 className="text-lg font-semibold mb-4">{user?.email}</h2>
        </div>
        <div>
          <p className="text-xl font-bold text-slate-500">Joined At</p>
          <h2 className="text-lg font-semibold">
            {new Date(user?.createdAt).toLocaleDateString()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
