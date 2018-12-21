process.stdin.setEncoding('utf8')

process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if (chunk !== null) {
    // First chunk will be our entire input.
    console.log(calculateChecksum(chunk))
  }
})

const calculateChecksum = input => {
  const ids = input.split('\n').map(string => string.trim())
  let twoCount = 0
  let threeCount = 0
  ids.forEach(id => {
    const letters = id.split('')
    const letterCounts = {}
    letters.forEach(letter => {
      const count = letters.reduce((acc, cur) => cur === letter ? acc + 1 : acc, 0)
      letterCounts[letter] = count
    })
    let containsTwo = false
    let containsThree = false
    for (let key in letterCounts) {
      if (letterCounts[key] === 2) containsTwo = true
      if (letterCounts[key] === 3) containsThree = true
    }
    if (containsTwo) twoCount += 1
    if (containsThree) threeCount += 1
  })
  return twoCount * threeCount
}

// const test = () => {
//   const result = calculateChecksum(`abcdef
//   bababc
//   abbcde
//   abcccd
//   aabcdd
//   abcdee
//   ababab`)
//   console.log(result)
// }

// test()
