// cat frequency-input.txt| node again.js

function day1part2 (data) {
  const nums = data.split('\n').map(Number)
  const frequencies = [0]
  var sum = 0
  while (1) {
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i]
      sum += num
      if (frequencies.includes(sum)) {
        return sum
      }
      frequencies.push(sum)
    }
  }
}

process.stdin.setEncoding('utf8')

process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if (chunk !== null) {
    console.log(day1part2(chunk))
  }
})
