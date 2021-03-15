import { join } from "path";
import { PluggableList } from "unified";
import rehypeHeaders from "./rehype-headers";
import rehypeImages from "./rehype-images";
import rehypeLinks from "./rehype-links";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkImportFrontmatter from "./remark-import-frontmatter";
import rehypeHighlight from "rehype-highlight";
import remarkCopyLinkedFiles from "remark-copy-linked-files";

const destinationDir = join(process.cwd(), "public/static/assets");
const staticPath = "/static/assets/";

interface Plugins {
  rehypePlugins: PluggableList;
  remarkPlugins: PluggableList;
}

const plugins: Plugins = {
  remarkPlugins: [
    remarkFrontmatter,
    remarkImportFrontmatter,
    [
      remarkCopyLinkedFiles,
      {
        destinationDir,
        staticPath,
        ignoreFileExtensions: [".md", ".mdx"],
      },
    ],
  ],
  rehypePlugins: [
    rehypeSlug,
    rehypeLinks,
    [
      rehypeImages,
      {
        destinationDir,
        staticPath,
      },
    ],
    [
      rehypeHighlight,
      { aliases: { bash: ["bsh", "systemd"], yaml: ["conf", "toml"] } },
    ],
    [rehypeHeaders, { maxLevel: 2 }],
  ],
};

export default plugins;
