import NextHead from "next/head";
import { useRouter } from "next/router";

import { buildCanonicalUrl, host } from "utils/url";

const defaultTitle = "Teleport Docs";

const formatTitle = (title?: string) => {
  const base = title ? `${title} | ` : "";

  return base + defaultTitle;
};
interface HeadProps {
  title: string;
  description?: string;
}

const Head = (meta: HeadProps) => {
  const router = useRouter();
  const url = buildCanonicalUrl(router);
  const title = formatTitle(meta.title);
  const description = meta.description || "";

  return (
    <NextHead>
      <title>{title}</title>
      <link rel="icon" href="/static/favicon.ico" />
      <link rel="icon" href="/static/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/static/apple.png" />
      <link rel="manifest" href="/static/manifest.webmanifest" />
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="author" content="Teleport" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${host}/og-image.png`} />
    </NextHead>
  );
};

export default Head;
