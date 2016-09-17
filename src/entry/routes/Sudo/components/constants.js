export const CellSize = 40
export const CellBorderWidth = 1
export const BorderWidth = 3

export function getCellPoistion(r, c) {
  const top = (CellSize + 2 * CellBorderWidth) * r +
  (Math.floor(r / 3) + 1) * (BorderWidth - CellBorderWidth)
  const left = (CellSize + 2 * CellBorderWidth) * c +
  (Math.floor(c / 3) + 1) * (BorderWidth - CellBorderWidth)
  return { top, left }
}

export function getLeft(x) {
  return (CellSize + 2 * CellBorderWidth) * x +
  (Math.floor(x / 3) + 1) * (BorderWidth - CellBorderWidth)
}

export function getTop(y) {
  return (CellSize + 2 * CellBorderWidth) * y +
  (Math.floor(y / 3) + 1) * (BorderWidth - CellBorderWidth)
}
