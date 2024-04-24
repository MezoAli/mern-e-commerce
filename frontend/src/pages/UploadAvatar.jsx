import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUploadAvatarMutation } from "@/store/api/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UploadAvatar = () => {
  const { user } = useSelector((state) => state.userSlice);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user?.avatar?.url : "../images/default_avatar.jpg"
  );
  const [avatar, setAvatar] = useState("");

  const handleImage = (e) => {
    const image = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setAvatar(fileReader.result);
        setAvatarPreview(fileReader.result);
      }
    };
  };

  const [upload, { error, isError, isLoading, isSuccess, data }] =
    useUploadAvatarMutation();
  console.log(error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      avatar,
    };
    upload(userData);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
    }
  }, [isError, isSuccess]);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-10">Upload Avatar</h2>
      <div className="flex justify-center items-center bg-slate-200 rounded-xl mb-6 py-4">
        <img
          alt="avatar"
          src={avatarPreview}
          className="rounded-full w-[250px] h-[250px]"
        />
      </div>
      <form
        className="grid w-full max-w-sm items-center gap-8 mx-auto"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="picture" className="text-semibold text-lg">
          Picture
        </Label>
        <Input id="picture" type="file" onChange={handleImage} />
        <Button type="submit" variant="auth" disabled={isLoading}>
          {isLoading ? "uploading..." : "Upload"}
        </Button>
      </form>
    </div>
  );
};

export default UploadAvatar;
