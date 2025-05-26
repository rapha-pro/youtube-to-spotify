// This file exports TypeScript types and interfaces used throughout the application to ensure type safety.

import { SVGProps } from "react";
import { LucideIcon } from 'lucide-react';
import { SpotifyIcon } from "@/components/icons";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface FeatureCardProps {
  id: string;
  icon: LucideIcon | typeof SpotifyIcon;
  iconColor: string;
  bgColor: string;
  title: string;
  description: string;
};

export interface FaqItemProps {
  id: string;
  question: string;
  answer: string;
};

export interface FaqCardProps {
  faq: FaqItemProps;
};

export interface areaProps {
  width?: number;
  height?: number;
};

export interface LogoProps {
  width?: number;
  height?: number;
  classname?: string;
  size?: number;
  showText?: boolean;
}