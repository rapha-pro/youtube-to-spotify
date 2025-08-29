const animatedElements = new Set<string>();

export const hasAnimated = (id: string): boolean => {
  console.log(`checking > `, animatedElements);
  return animatedElements.has(id);
};

export const markAnimated = (id: string): void => {
  animatedElements.add(id);
};
