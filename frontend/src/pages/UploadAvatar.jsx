import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
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

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-10">Upload Avatar</h2>
      <div className="flex justify-center items-center bg-slate-200 rounded-xl mb-6">
        <img
          alt="avatar"
          src={avatarPreview}
          className="rounded-full w-[250px] h-[250px]"
        />
      </div>
      <form className="grid w-full max-w-sm items-center gap-8 mx-auto">
        <Label htmlFor="picture" className="text-semibold text-lg">
          Picture
        </Label>
        <Input id="picture" type="file" onChange={handleImage} />
        <Button type="submit" variant="auth">
          Upload
        </Button>
      </form>
    </div>
  );
};

export default UploadAvatar;
