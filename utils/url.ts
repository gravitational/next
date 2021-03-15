import { NextRouter } from "next/router";
import config from "../config.json";

const { latest } = config;

export const host = process.env.NEXT_PUBLIC_HOST;

export const isExternalLink = (href: string): boolean =>
  href.startsWith("//") || href.startsWith("mailto:") || href.includes("://");

export const isHash = (href: string): boolean => href.startsWith("#");

export const getVersionAsPath = (href: string) => {
  return href.replace(`/ver/${latest}`, "");
};

export const extractPath = (href: string) => {
  return href.split("#")[0].split("?")[0];
};

export const getPath = (href: string) => {
  const base = getVersionAsPath(extractPath(href));

  // In SSR mode next ignores trailingSlsh option in asPath
  return base.endsWith("/") ? base : `${base}/`;
};

export const getHash = (href: string) => href.split("#")[1];

export const buildCanonicalUrl = (router: NextRouter) => {
  const path = getVersionAsPath(router.asPath);

  return `${host}${path}`;
};
