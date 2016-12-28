module.exports = mergeJoinWith
var identity = require('lodash.identity')
/*
 mergeJoinWith receives two ordered strictly increasing arrays and join them using joinFunction
 comparisonFunction(a,b) returns > 0 if a > b, 0 if they have the same order
 ordered strictly increasing means that comparisonFunction(secondArray[i+1], secondArray[i])>0 for every i, same for firstArray
 optional firstArrayJoin function to be run on first array elements with no data on the second array
 option secondArrayJoin function to be run on second array elements with no data on the first array
 */
function mergeJoinWith (firstArray, secondArray, comparisonFunction, joinFunction, firstArrayJoin, secondArrayJoin) {
  firstArrayJoin = _.isFunction(firstArrayJoin) ? firstArrayJoin : identity
  secondArrayJoin = _.isFunction(secondArrayJoin) ? secondArrayJoin : identity
  // Strategy is as follows we walk both arrays at the same time getting the smallest next. If they are equal the result is computed using the joinFunction
  var newArray = []
  var i = 0
  var j = 0
  var e1
  var e2
  var comparison
  while (i < firstArray.length || j < secondArray.length) {
    if (i === firstArray.length) {
      newArray.push(secondArrayJoin(secondArray[j]))
      j++
      continue
    }
    if (j === secondArray.length) {
      newArray.push(firstArrayJoin(firstArray[i]))
      i++
      continue
    }
    e1 = firstArray[i]
    e2 = secondArray[j]
    comparison = comparisonFunction(e1, e2)
    if (comparison > 0) {
      newArray.push(secondArrayJoin(e2))
      j++
      continue
    }
    if (comparison < 0) {
      newArray.push(firstArrayJoin(e1))
      i++
      continue
    }
    if (comparison === 0) {
      newArray.push(joinFunction(e1, e2))
      i++
      j++
      continue
    }
    // Probably comparisonFunction does not work, we should raise an error
    break
  }
  return newArray
}