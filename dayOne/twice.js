process.stdin.setEncoding('utf8')

let inputNumbers = []

process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if (chunk !== null) {
    inputNumbers = inputNumbers.concat(chunk.split('\n').filter(string => string !== ''))
  }
})

const inputToNumber = (stringNumber) => {
  const result = /\+/.test(stringNumber) ? parseInt(stringNumber.substring(1)) : (-1 * parseInt(stringNumber.substring(1)))
  if (isNaN(result)) console.warn('NUMBER IS NaN')
  return result
}

// const firstDuplicateFrequency = (index, frequencies, numbers) => {
//   const nextFrequency = frequencies[frequencies.length - 1] + inputToNumber(numbers[index])
//   console.log(`Number of checked Frequencies: ${frequencies.length}, next is: ${nextFrequency}`)
//   // console.log(`Next frequency: ${nextFrequency} with frequencies: ${frequencies.join(', ')} and being in the array at ${frequencies.indexOf(nextFrequency)}`)
//   if (frequencies.indexOf(nextFrequency) > -1) return nextFrequency
//   const nextIndex = (index + 1) === (numbers.length) ? 0 : index + 1
//   return firstDuplicateFrequency(nextIndex, frequencies.concat([nextFrequency]), numbers)
// }

const findSmallestDifference = (numbers) => {
  const withDifference = numbers.map(number => {
    const smallestDifference = numbers.filter(filterNumber => filterNumber !== number).reduce((acc, curr) => Math.abs(Math.abs(number) - Math.abs(curr)) < acc ? Math.abs(number - curr) : acc, 1000000)
    return { number, smallestDifference }
  })
  return withDifference.sort((a, b) => {
    if (a.smallestDifference < b.smallestDifference && a.number > b.number) return -1
    else return 1
  })[0]
}

const firstDuplicateFrequency = numbers => {
  const iterationOne = numbers.reduce((acc, curr) => acc.concat([acc[acc.length - 1] + curr]), [0])
  const iterationDifference = iterationOne[iterationOne.length - 1]
  const modGroups = {}
  iterationOne.forEach(number => {
    modGroups[number % iterationDifference] ? modGroups[number % iterationDifference].push(number) : modGroups[number % iterationDifference] = [number]
  })
  const groups = []
  for (let key in modGroups) {
    const numbers = modGroups[key]
    if (numbers.length > 1) {
      groups.push({
        numbers,
        smallestDifference: findSmallestDifference(numbers.splice(0, numbers.length - 2))
      })
    }
  }
  console.log(groups)
  const result = groups.sort((a, b) => {
    if (a.smallestDifference.smallestDifference < b.smallestDifference.smallestDifference) return -1
    return 1
  })[0].smallestDifference.number
  return result
}

process.stdin.on('end', () => {
  // const result = firstDuplicateFrequency(0, [0], inputNumbers)
  const result = firstDuplicateFrequency(inputNumbers.map(input => inputToNumber(input)))
  console.log('Frequency:', result)
})

const test = () => {
  console.log(firstDuplicateFrequency([1, 1, 10, -9]))
}

test()
