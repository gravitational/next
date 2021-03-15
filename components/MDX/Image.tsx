import NextImage, { ImageProps } from "next/image";
import Box from "components/Box";

const Image = (props: ImageProps) => {
  const width = parseInt(props.width as string, 10);
  const height = parseInt(props.height as string, 10);

  return (
    <Box mb={[2, 3]}>
      <NextImage
        {...props}
        width={width}
        height={height}
        layout="responsive"
        sizes="(min-width: 1460px) 900px, 100vw"
      />
    </Box>
  );
};

export default Image;
