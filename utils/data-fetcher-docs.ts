import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import template from "./template";
import {
  NavigationCategory,
  NavigationItem,
} from "../components/DocsPage/types";
import config from "../config.json";

const { versions, latest, branches } = config;

const { NEXT_PUBLIC_GITHUB_DOCS } = process.env;

export const getVersion = (filepath: string) =>
  /\/content\/([^/]+)\/docs\//.exec(filepath)[1];

interface Redirect {
  source: string;
  destination: string;
  permanent?: boolean;
}

interface Config {
  navigation: NavigationCategory[];
  variables: Record<string, unknown>;
  redirects: Redirect[];
}

const normalizeDocsUrl = (version: string, url: string) =>
  (latest === version ? "" : `/ver/${version}`) + url;

const normalizeDocsUrls = (
  version: string,
  entries: NavigationItem[]
): NavigationItem[] => {
  return entries.map((entry) => {
    const newEntry = Object.assign(entry);

    newEntry.slug = normalizeDocsUrl(version, entry.slug);

    if (entry.entries) {
      newEntry.entries = normalizeDocsUrls(version, entry.entries);
    }

    return newEntry;
  });
};

const normalizeNavigation = (
  version: string,
  navigation: NavigationCategory[]
): NavigationCategory[] =>
  navigation.map((category) => {
    return {
      ...category,
      entries: normalizeDocsUrls(version, category.entries),
    };
  });

const normalizationRedirects = (
  version: string,
  redirects: Redirect[]
): Redirect[] => {
  return redirects.map((redirect) => {
    return {
      ...redirect,
      source: normalizeDocsUrl(version, redirect.source),
      destination: normalizeDocsUrl(version, redirect.destination),
    };
  });
};

export const getConfig = (version: string) => {
  const path = resolve("content", version, "docs/config.json");

  if (existsSync(path)) {
    try {
      const content = readFileSync(path, "utf-8");
      const config = JSON.parse(content) as Config;

      config.navigation = normalizeNavigation(version, config.navigation);

      if (config.redirects) {
        config.redirects = normalizationRedirects(version, config.redirects);
      }

      if (!config.variables) {
        config.variables = {};
      }

      return config as Config;
    } catch {
      throw Error(`File ${path} didn't include 'navigation' field.`);
    }
  } else {
    throw Error(`File ${path} does not exists.`);
  }
};

interface ParseMdxContentProps {
  content: string;
  filepath: string;
}

export const parseMdxContent = ({
  content: originalContent,
  filepath,
}: ParseMdxContentProps) => {
  const current = getVersion(filepath);
  const { navigation, variables } = getConfig(current);
  const root = resolve(`content/${current}`);
  const content = template(originalContent, root, variables);

  const githubUrl = branches[current]
    ? filepath.replace(
        root,
        `${NEXT_PUBLIC_GITHUB_DOCS}/edit/${branches[current]}`
      )
    : "";

  return {
    content,
    navigation,
    githubUrl,
    versions: {
      current,
      latest,
      available: versions,
    },
  };
};
