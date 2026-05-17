export type CnsArgType = string | null | undefined | false;

/**
 * Discards null, undefined, and false values and returns a space-separated string of class names.
 */
export const cns = (...args: CnsArgType[]): string => args.filter(Boolean).join(" ");
