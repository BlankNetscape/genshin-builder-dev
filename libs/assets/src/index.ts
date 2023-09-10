import artifacts from './artifacts'
import chars from './characters'
import weapons from './weapons'

export * from './genreal'

export const combinedAssets = {
  artifacts,
  chars,
  weapons,
} as const
