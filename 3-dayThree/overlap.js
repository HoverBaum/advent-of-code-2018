process.stdin.setEncoding('utf8')

process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if (chunk !== null) {
    // First chunk will be our entire input.
    const claims = createClaimsFromInput(chunk)
    const fabric = createClaimedFabric(claims)
    // visualizeFabric(fabric)
    console.log('Overlaps:', countOverlapsInClaims(fabric))
    console.log('Number of Overlaps:', countOverlapsInClaims(fabric))
    console.log('Non Overlapping claims', findNonOverlappingClaims(claims, fabric))
  }
})

const createClaimsFromInput = input => {
  const lines = input.split('\n').map(string => string.trim()).filter(line => line !== '')
  const claims = lines.map(line => {
    const parts = line.split(' ')
    const id = parseInt(parts[0].substring(1))
    const left = parseInt(parts[2].split(',')[0])
    const top = parseInt(parts[2].split(',')[1].replace(':', ''))
    const width = parseInt(parts[3].split('x')[0])
    const height = parseInt(parts[3].split('x')[1])
    return {
      id,
      left,
      top,
      width,
      height,
      bottom: top + height - 1,
      right: left + width - 1
    }
  })
  return claims
}

const createClaimedFabric = claims => {
  const fabric = []
  const fabricHeight = claims.reduce((acc, cur) => cur.bottom > acc ? cur.bottom : acc, 0)
  const fabricWidth = claims.reduce((acc, cur) => cur.right > acc ? cur.right : acc, 0)
  for (let x = 0; x <= fabricWidth; x++) {
    fabric[x] = []
    for (let y = 0; y <= fabricHeight; y++) {
      fabric[x][y] = { claims: [] }
    }
  }
  claims.forEach(claim => {
    for (let x = claim.left; x <= claim.right; x++) {
      for (let y = claim.top; y <= claim.bottom; y++) {
        fabric[x][y].claims.push(claim.id)
      }
    }
  })
  return fabric
}

const visualizeFabric = fabric => {
  const emptyMarker = '.'
  const overlapMarker = 'X'
  const lines = fabric.map(line => line.map(cell => {
    if (cell.claims.length === 0) return emptyMarker
    if (cell.claims.length === 1) return cell.claims[0] % 9
    return `\x1b[31m${overlapMarker}\x1b[0m`
  }).join(''))
  lines.forEach(line => console.log(line))
}

const countOverlapsInClaims = fabric => {
  return fabric.reduce((acc, cur) => acc + cur.reduce((acc, cur) => cur.claims.length > 1 ? acc + 1 : acc, 0), 0)
}

const findNonOverlappingClaims = (claims, fabric) => {
  const overlappingClaims = {}
  fabric.forEach(line => line.forEach(cell => {
    if (cell.claims.length > 1) {
      cell.claims.forEach(claimId => {
        overlappingClaims[claimId] = true
      })
    }
  }))
  return claims.filter(claim => !overlappingClaims[claim.id]).map(claim => claim.id)
}

// const test = () => {
//   const input = `#1 @ 1,3: 4x4
//  #2 @ 3,1: 4x4
//  #3 @ 5,5: 2x2`
//   const claims = createClaimsFromInput(input)
//   const fabric = createClaimedFabric(claims)
//   visualizeFabric(fabric)
//   console.log('Number of Overlaps:', countOverlapsInClaims(fabric))
//   console.log('Non Overlapping claims', findNonOverlappingClaims(claims, fabric))
// }

// test()
