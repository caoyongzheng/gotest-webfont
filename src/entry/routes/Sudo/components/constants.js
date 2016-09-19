export const CellSize = 40
export const CellBorderWidth = 1
export const BorderWidth = 3

export function getLeft(x) {
  return (CellSize + 2 * CellBorderWidth) * x +
  (Math.floor(x / 3) + 1) * (BorderWidth - CellBorderWidth)
}

export function getTop(y) {
  return (CellSize + 2 * CellBorderWidth) * y +
  (Math.floor(y / 3) + 1) * (BorderWidth - CellBorderWidth)
}
