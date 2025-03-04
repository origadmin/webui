/**
 * Unify the way all mobile operations are implemented
 * @param arr array to be manipulated
 * @param from start position
 * @param to target position
 * @returns new array
 */
export function move<T>(arr: T[], from: number, to: number): T[] {
  const newArr = [...arr];
  const [removed] = newArr.splice(from, 1);
  newArr.splice(to, 0, removed);
  return newArr;
}
