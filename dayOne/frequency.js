process.stdin.setEncoding('utf8')

let inputNumbers = []

process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if (chunk !== null) {
    inputNumbers = inputNumbers.concat(chunk.split('\n'))
  }
})

const inputToNumber = (stringNumber) => {
  const result = /\+/.test(stringNumber) ? parseInt(stringNumber.substring(1)) : (-1 * parseInt(stringNumber.substring(1)))
  if (isNaN(result)) return 0
  return result
}

process.stdin.on('end', () => {
  const result = inputNumbers.reduce((acc, cur) => acc + inputToNumber(cur), 0)
  console.log('Frequency:', result)
})
