import { existsSync, readFileSync } from "fs";
import sizeOf from "image-size";
import { Transformer } from "unified";
import { Element, Root } from "hast";
import visit from "unist-util-visit-parents";
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
    visit<Element>(root, [isLocalImg], (node, ancestors) => {
      const { src } = node.properties;

      const localSrc = (src as string).replace(
        staticPath,
        `${destinationDir}/`
      );

      if (existsSync(localSrc)) {
        const file = readFileSync(localSrc);

        try {
          const { width, height } = sizeOf(file);

          node.properties.width = width;
          node.properties.height = height;
        } catch {}
      }

      const parent = ancestors[ancestors.length - 1] as Element;

      if (
        parent.type === "element" &&
        parent.tagName === "p" &&
        parent.children.length === 1
      ) {
        const grandparent = ancestors[ancestors.length - 2] as Element;
        const parentIndex = grandparent.children.indexOf(parent);

        if (parentIndex !== -1) {
          grandparent.children[parentIndex] = node;
        }

        return visit.SKIP;
      }
    });
  };
}
