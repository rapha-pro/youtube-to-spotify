export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Syncwave",
  description: "Convert your YouTube playlists to Spotify in seconds.",
  navItems: [
    {
      label: "Features",
      href: "/#features",
      icon: "Sparkles"
    },
    {
      label: "How It Works",
      href: "/#how-it-works",
      icon: "Workflow"
    },
    {
      label: "FAQ",
      href: "/#faq",
      icon: "HelpCircle"
    },
  ],
};


export const successfullTransferPercent = 80;
export const playlistDescription = "Summer vibe " +  new Date().getFullYear().toString();