export const rarityKeys = [1, 2, 3, 4, 5] as const
export type RarityKey = (typeof rarityKeys)[number]
