// This file exports TypeScript types and interfaces used throughout the application to ensure type safety.

import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ButtonProps {
  color?: string;
  variant?: string;
  size?: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export interface CardProps {
  title: string;
  description: string;
  className?: string;
}

export interface TestimonialProps {
  name: string;
  feedback: string;
  avatarUrl?: string;
}

export interface FeatureProps {
  title: string;
  description: string;
}