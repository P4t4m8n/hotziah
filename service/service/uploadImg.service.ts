export const uploadImg = async (file: Blob): Promise<string> => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME!;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET!;

  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  try {
    const formData = new FormData();
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("file", file);
    const res = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const imgUrl: { secure_url: string } = await res.json();
    return imgUrl.secure_url;
  } catch (err) {
    console.info(`Failed to upload image to cloudinary: ${err}`);
    throw new Error(`Failed to upload image to cloudinary: ${err}`);
  }
};
