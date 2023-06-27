import { Regex } from "../data";


/**
 * Remove restricted symbols from profile name
 *
 * @param name Profile name
 * @returns Profile name with restricted symbols removed
 */
export const sanitizeDisplayName = (
  name: string | null | undefined
): string | null => {
  if (!name) {
    return null;
  }

  return name.replace(Regex.profileNameFilter, ' ').trim();
};
