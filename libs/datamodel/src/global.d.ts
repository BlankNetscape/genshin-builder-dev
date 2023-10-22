declare global {
  export type Displayable = string | JSX.Element
  export type Dict<K extends string | number, V> = Partial<Record<K, V>>
  export type StrictDict<K extends string | number, V> = Record<K, V>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type TransObject = any

  export interface ObjectConstructor {
    export keys<K, V>(o: StrictDict<K, V>): `${K}`[]
    export keys<K, V>(o: Dict<K, V> | Record<string, never>): `${K}`[]
    export values<K, V>(o: Dict<K, V> | Record<string, never>): V[]
    export values<K, V>(
      o: StrictDict<K, Exclude<V, undefined>>
    ): Exclude<V, undefined>[]
    export entries<K, V>(
      o: StrictDict<K, Exclude<V, undefined>>
    ): [`${K}`, Exclude<V, undefined>][]
    export entries<K, V>(o: Dict<K, V> | Record<string, never>): [`${K}`, V][]
  }
}

export {}