const mergeJoinWith = require('../index')
describe('Merge join with', function () {
  it('Two arrays', function () {
    var firstArray = [{a: 1, b: 2}, {a: 2, b: 2}]
    var secondArray = [{a: 2, b: 1}, {a: 3, b: 4}]
    var comparator = function (e1, e2) {
      return e1.a - e2.a
    }
    var join = function (e1, e2) {
      return {a: e1.a, c: e1.b + e2.b}
    }
    var expectedArray = [{a: 1, b: 2}, {a: 2, c: 3}, {a: 3, b: 4}]
    var result = mergeJoinWith(firstArray, secondArray, comparator, join)
    expect(result).toEqual(expectedArray)
  })
  it('Condition on the first array', function () {
    var firstArray = [{a: 1}, {a: 2}]
    var secondArray = []
    var comparator = (el1, el2) => el1.a - el2.a
    var join = (el1, el2) => el1
    var firstArrayJoin = el1 => null
    var expectedArray = [null, null]
    var result = mergeJoinWith(firstArray, secondArray, comparator, join, firstArrayJoin)
    expect(result).toEqual(expectedArray)
  })
})