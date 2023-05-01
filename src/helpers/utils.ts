export function findOccurrences<T, Key extends keyof T>(array: T[], key: Key): Map<T[Key], number> {
  const occurencesMap = new Map<T[Key], number>()

  return array.reduce<Map<T[Key], number>>((map, currentVal) => {
    let value = occurencesMap.get(currentVal[key])

    if (value) {
      return map.set(currentVal[key], ++value)
    }

    return map.set(currentVal[key], 1)
  }, occurencesMap)
}

export const getEntityNormalizor =
  <T, KeyToFind extends keyof T, KeyToNormalize extends keyof T>(
    occurrencesMap: Map<T[KeyToFind], number>,
    keyToFind: KeyToFind,
    keyToNormalize: KeyToNormalize
  ) =>
  (entity: T): T => {
    const occurencesAmount = occurrencesMap.get(entity[keyToFind])

    if (occurencesAmount) {
      return {
        ...entity,
        [keyToNormalize]: entity[keyToNormalize] + String(occurencesAmount + 1)
      }
    }

    return entity
  }

export function convertArrayToMap<T, Key extends keyof T>(array: T[], key: Key): Map<T[Key], T> {
  const map = new Map<T[Key], T>()

  return array.reduce<Map<T[Key], T>>((map, currentVal) => {
    return map.set(currentVal[key], currentVal)
  }, map)
}
