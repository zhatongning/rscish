const colorBitNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
const randomColor = () => {
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += colorBitNums[Math.floor(Math.random() * 16)]
  }
  return color
}

export const grids = new Array(10).fill(0).map((v, idx) => ({
  id: idx,
  color: randomColor(),
}))