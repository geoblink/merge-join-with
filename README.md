# Merge join with

This library exposes a method to perform full outer joins between ordered arrays in O(n).

Given two arrays

```
const populationById = [{id: 0, population: 1}, {id: 2, population: 2}]
const sizeById = [{id: 0, size: 1}, {id: 3, size: 4}]
```

We can join them to obtain:
```
const merge = [{id: 0, population: 1, size: 1}, {id: 2, population: 2}, {id: 3, size: 4}]
```


## Usage

The method has four required parameters, the two arrays, the comparator function with with they where sorted and a function to join the elements

```
const mergeJoinWith = require('merge-join-with')
const comparisonFunction = (o1, o2) => o1.id - o2.id
const joinFunction = (o1, o2) => Object.assign({}, o1, o2)

const populationById = [{id: 0, population: 1}, {id: 2, population: 2}]
const sizeById = [{id: 0, size: 1}, {id: 3, size: 4}]

const merge = mergeJoinWith(populationById, sizeById, comparisonFunction, joinFunction)
```



