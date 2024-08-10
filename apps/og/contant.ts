export const COLOR_LIST: { [key: number]: [number, number, number][] } = {
  2024: [[255, 190, 152]],
  2023: [[187, 38, 73]],
  2022: [[102, 103, 171]],
  2021: [
    [147, 149, 151],
    [245, 223, 77],
  ],
  2020: [[15, 76, 129]],
  2019: [[255, 111, 97]],
  2018: [[95, 75, 139]],
  2017: [[136, 176, 75]],
  2016: [
    [247, 202, 202],
    [147, 169, 209],
  ],
  2015: [[150, 79, 76]],
  2014: [[173, 94, 153]],
  2013: [[0, 148, 115]],
  2012: [[221, 65, 36]],
}

export const SECONDARY_COLOR = (primary: [number, number, number]) => {
  const [red, green, blue] = primary.map((item) => Number(item))

  const newRed = red + 90 > 255 ? 255 : red + 90
  const newGreen = green + 47 > 255 ? 255 : green + 47
  const newBlue = blue + 41 > 255 ? 255 : blue + 41

  return [newRed, newGreen, newBlue]
}
