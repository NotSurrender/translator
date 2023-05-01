export function findOccurrencesAmount<T>(array: T[], callback: (item: T) => boolean): number {
  let occurrencesCount = 0

  array.forEach((item) => {
    if (callback(item)) {
      occurrencesCount++
    }
  })

  return occurrencesCount
}
