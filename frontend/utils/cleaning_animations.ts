import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Kills all GSAP animations and ScrollTriggers for a specific element or class
 * @param target - Element reference or class name (without the dot)
 */
export const killAnimations = (target: Element | string | null): void => {
  if (!target) return;

  // Kill GSAP tweens
  if (typeof target === "string") {
    gsap.killTweensOf(`.${target}`);
  } else {
    gsap.killTweensOf(target);
  }

  // Kill ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => {
    const element = trigger.vars.trigger as Element;

    if (
      (typeof target === "string" && element?.classList?.contains(target)) ||
      element === target
    ) {
      trigger.kill();
    }
  });
};
