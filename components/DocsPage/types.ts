// Moved this types to separate file to simplyfy loaders build that requires them

import type { IconName } from "components/Icon/types";

export interface NavigationItem {
  title: string;
  slug: string;
}

export interface NavigationCategory {
  icon: IconName;
  title: string;
  entries: NavigationItem[];
}
