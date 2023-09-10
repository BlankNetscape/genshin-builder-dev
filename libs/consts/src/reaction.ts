export type TransformativeReactionKey =
  | 'overloaded'
  | 'shattered'
  | 'electrocharged'
  | 'superconduct'
  | 'swirl'
  | 'burning'
  | 'bloom'
  | 'burgeon'
  | 'hyperbloom'

export type AmplifyingReactionKey = 'vaporize' | 'melt'
export type CatalyzeReactionKey = 'spread' | 'aggravate'
export type AdditiveReactionKey = CatalyzeReactionKey

export type ReactionKey =
  | TransformativeReactionKey
  | AmplifyingReactionKey
  | CatalyzeReactionKey

// TODO - Reaction type check
