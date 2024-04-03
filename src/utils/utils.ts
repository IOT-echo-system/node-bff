export const unique = <T>(list: T[]): T[] => {
  return list.reduce<T[]>((items, item) => {
    return items.includes(item) ? items : items.concat(item)
  }, [])
}
