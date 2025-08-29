import { Mail } from "lucide-react";

import { TwitterIcon } from "@/components/icons";

export const emailAddress = "nathonana01@gmail.com";
export const twitterUsername = "rapha_pro_";

const socialLinks = [
  {
    name: "Twitter",
    href: `https://twitter.com/${twitterUsername}`,
    icon: TwitterIcon,
    color: "text-gray-400 hover:text-blue-400",
  },
  {
    name: "Email",
    href: `mailto:${emailAddress}`,
    icon: Mail,
    color: "text-gray-400 hover:text-green-400",
  },
];

export default socialLinks;
