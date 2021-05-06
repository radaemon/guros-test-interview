function hasMutation(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (anyAdjacentRepeatedNeighbors(array, [i, j], array[i][j]) === true) {
        return true
      }
    }
  }
  return false
}

function anyAdjacentRepeatedNeighbors(array, [i, j], gene) {
  let repeatedGenes = false

  let northEastNeighs = [
    [i - 1, j + 1],
    [i - 2, j + 2],
    [i - 3, j + 3],
  ]
  let eastNeighs = [
    [i, j + 1],
    [i, j + 2],
    [i, j + 3],
  ]
  let southEastNeighs = [
    [i + 1, j + 1],
    [i + 2, j + 2],
    [i + 3, j + 3],
  ]
  let southNeighs = [
    [i + 1, j],
    [i + 2, j],
    [i + 3, j],
  ]

  let allGroups = [northEastNeighs, eastNeighs, southEastNeighs, southNeighs]

  allGroups.forEach((group) => {
    let count = 0
    group.forEach(([i, j]) => {
      if (array[i] === undefined || array[i][j] === undefined) {
        return
      } else if (array[i][j] === gene) {
        count++
      }
      if (count >= 3) {
        repeatedGenes = true
      }
    })
  })

  return repeatedGenes
}

module.exports = hasMutation
