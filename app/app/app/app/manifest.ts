import type { MetadataRoute } from "next";

const appName = "Управляющий совет";
const shortName = "Управляющий совет";
const description = "Управляющий совет детского сада";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appName,
    short_name: shortName,
    description,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#1e40af",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
