export const imageShow = (src) => {
  return (
    <img
      src={src}
      alt="images"
      className="max-w-[100%] rounded p-2 block object-contain max-h-[100px] w-full h-full"
    />
  );
};

export const videoShow = (src) => {
  return (
    <video
      controls
      src={src}
      alt="images"
      className="max-w-[100%] rounded p-2 block object-contain max-h-[100px] w-full h-full"
    />
  );
};
