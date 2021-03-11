import NextImage from "next/image";
import Box from "components/Box";

const Image = (props) => {
  // return <BaseImage display="block" maxWidth="100%" {...props} />;

  const width = parseInt(props.width, 10);
  const height = parseInt(props.height, 10);

  console.log({ width, height });

  return (
    <Box mb={[2, 3]}>
      <NextImage {...props} width={width} height={height} layout="responsive" />
    </Box>
  );
};

export default Image;
