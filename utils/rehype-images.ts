import { existsSync } from "fs";
import sizeOf from "image-size";
import { Transformer } from "unified";
import { Element, Root } from "hast";
import visit from "unist-util-visit";
import { RehypeNode } from "./unist-types";
import { isExternalLink, isHash } from "./url";

const isLocalSrc = (href: string) => !isExternalLink(href) && !isHash(href);

const isLocalImg = (node: RehypeNode): boolean => {
  return (
    node.type === "element" &&
    node.tagName === "img" &&
    typeof node.properties.src === "string" &&
    isLocalSrc(node.properties.src)
  );
};

interface RehypeImagesProps {
  destinationDir: string;
  staticPath: string;
}

export default function rehypeImages({
  destinationDir,
  staticPath,
}: RehypeImagesProps): Transformer {
  return (root: Root) => {
    visit<Element>(root, [isLocalImg], (node) => {
      const { src } = node.properties;

      const localSrc = (src as string).replace(
        staticPath,
        `${destinationDir}/`
      );

      if (existsSync(localSrc)) {
        const { width, height } = sizeOf(localSrc);

        node.properties.width = width;
        node.properties.height = height;
      }
    });
  };
}
