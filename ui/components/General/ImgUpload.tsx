import { ImageUploadSvg } from "@/ui/Icons/Svgs";
import Image from "next/image";

interface Props {
  imgUrl?: string;
}
export default function ImgUpload({ imgUrl }: Props) {
  return (
    <div>
      <label htmlFor="image">
        {imgUrl ? (
          <Image src={imgUrl} alt="image" width={144} height={144} />
        ) : (
          <ImageUploadSvg />
        )}
      </label>
      <input type="file" name="image" accept="image/*" hidden />
    </div>
  );
}
