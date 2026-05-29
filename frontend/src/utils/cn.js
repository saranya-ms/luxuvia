export const clsx = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const twMerge = (base, override) => {
  // Simple merge - in production, use tailwind-merge package
  return `${base} ${override}`;
};

export const cn = (...inputs) => {
  return clsx(inputs);
};
