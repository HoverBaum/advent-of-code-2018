process.stdin.setEncoding('utf8')

process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if (chunk !== null) {
    // First chunk will be our entire input.
    console.log(findID(chunk))
  }
})

const findID = input => {
  const ids = input.split('\n').map(string => string.trim()).map(id => id.split(''))
  return ids.reduce((acc, cur) => {
    const withDiffOne = ids.filter(id => id !== cur).find(id => {
      let differences = 0
      cur.forEach((cha, index) => {
        if (cha !== id[index]) differences += 1
      })
      return differences === 1
    })
    if (!withDiffOne) return acc
    const soughtId = withDiffOne.filter((cha, index) => cha === cur[index]).join('')
    return soughtId
  }, [])
}

// const test = () => {
//   const result = findID(`abcde
//   fghij
//   klmno
//   pqrst
//   fguij
//   axcye
//   wvxyz`)
//   console.log(result)
// }

// test()
