import { MessagePaginate } from "@social-zone/graphql";


/**
 * Returns an array of unique messages from the given array of decoded messages.
 *
 * @param msgObj Array of decoded messages.
 * @returns Array of unique messages.
 */
export const getUniqueMessages = (msgObj: MessagePaginate[]): MessagePaginate[] => {
  const uniqueMessages = [
    ...Array.from(new Map(msgObj.map((item) => [item['id'], item])).values())
  ];
  uniqueMessages.sort((a, b) => {
    return (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0);
  });

  return uniqueMessages ?? [];
};


