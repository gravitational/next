import { MenuCategoryProps } from "./Category";
import accessDropdownPngPath from "./assets/access-dropdown.png";
import accessPngPath from "./assets/access-plane.png";
import applicationPngPath from "./assets/application.png";
import kubernetesPngPath from "./assets/kubernetes.png";
import serverPngPath from "./assets/server.png";

const menu: MenuCategoryProps[] = [
  {
    title: "Products",
    description: "Unified Access Plane",
    href: "/teleport/",
    cover: accessDropdownPngPath,
    children: [
      {
        mobileOnly: true,
        image: accessPngPath,
        title: "Unified Access Plane",
        description:
          "Consolidates access controls and auditing across all environments - infrastructure, applications and data",
        href: "/teleport/",
      },
      {
        image: serverPngPath,
        title: "Teleport Server Access",
        description:
          "SSH securely into Linux servers and smart devices with a complete audit trail",
        href: "/teleport/server/",
      },
      {
        image: kubernetesPngPath,
        title: "Teleport Kubernetes Access",
        description:
          "Access Kubernetes clusters securely with complete visibility to access and behavior",
        href: "/teleport/kubernetes/",
      },
      {
        image: applicationPngPath,
        title: "Teleport Application Access",
        description:
          "Access web applications running behind NAT and firewalls with security and compliance",
        href: "/teleport/application/",
      },
    ],
  },
  {
    title: "Documentation",
    description: "Teleport documentation",
    href: "/docs/",
    children: [
      {
        icon: "stack",
        title: "Documentation",
        description: "Developer documenation for using Teleport",
        href: "/docs/",
      },
      {
        icon: "gamepad",
        title: "How it Works",
        description: "Learn the fundamentals of how Teleport works",
        href: "/teleport/how-it-works/",
      },
      {
        icon: "code",
        title: "Github",
        description: "View the open source respository on Github",
        href: "https://github.com/gravitational/teleport",
      },
    ],
  },
  {
    title: "Learn",
    description: "Learn more about teleport",
    href: "/resources/",
    children: [
      {
        icon: "note",
        title: "The blog",
        description: "Technical articles, news, and product announcements",
        href: "/blog/",
      },
      {
        icon: "building",
        title: "Our customers",
        description:
          "Learn how companies use Teleport to secure their environments",
        href: "/case-study/",
      },
      {
        icon: "presentation",
        title: "Resources",
        description:
          "A collection of whitepapers, webinars, demos, and more...",
        href: "/resources/",
      },
      {
        icon: "calendar",
        title: "Events",
        description: "View our upcoming events",
        href: "/about/events/",
      },
    ],
  },
  {
    title: "Company",
    description: "Company",
    href: "/about/",
    children: [
      {
        icon: "building",
        title: "About us",
        description: "Our missions and vision for the future",
        href: "/about/",
      },
      {
        icon: "flag",
        title: "Careers",
        description: "View our available career opportunities",
        href: "https://jobs.lever.co/gravitational",
      },
      {
        icon: "earth",
        title: "News",
        description: "Featured publication from around the web",
        href: "/about/press/",
      },
    ],
  },
];

export default menu;
