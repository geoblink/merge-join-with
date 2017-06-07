# Merge join with

This library exposes a method to perform full outer joins between ordered arrays in O(n).

Given two arrays

```
const populationById = [{id: 0, population: 1}, {id: 2, population: 2}]
const sizeById = [{id: 0, size: 1}, {id: 2, size: 4}]
```

We can join them to obtain:
```
const merge = [{id: 0, population: 1, size: 1}, {id: 2, population: 2, size: 4}]
```


## Basic Usage

The method has four required parameters, the two arrays, the comparator function with which they were sorted and a function to join the elements

```
const mergeJoinWith = require('merge-join-with')
const comparisonFunction = (o1, o2) => o1.id - o2.id
const joinFunction = (o1, o2) => Object.assign({}, o1, o2)

const populationById = [{id: 0, population: 1}, {id: 2, population: 2}]
const sizeById = [{id: 0, size: 1}, {id: 2, size: 4}]

const merge = mergeJoinWith(populationById, sizeById, comparisonFunction, joinFunction)
assert.deepEqual(merge, [{id: 0, population: 1, size: 1}, {id: 2, population: 2, size: 4}]
```

## Advanced usages

#### Asymmetric joins
In the first example the property was at the same level, that is `root->id`, but sometimes that is not the case.
 For example you might want to merge some features from a geojson with information from another server.
 
 
```
const mergeJoinWith = require('merge-join-with')
const comparisonFunction = (o1, o2) => o1.properties.id - o2.id
const joinFunction = function (o1, o2) {
    Object.assign(o1.properties, o2)
    return o1
}

const populationById = [{geometry: {....}, properties: {id: 0, population: 1}, {geometry: {...}, properties: {id: 2, population: 2}]
const sizeById = [{id: 0, size: 1}, {id: 2, size: 4}]

const merge = mergeJoinWith(populationById, sizeById, comparisonFunction, joinFunction)
assert.deepEqual(merge, [{geometry: {....}, properties: {id: 0, population: 1, size: 1}, {geometry: {...}, properties: {id: 2, population: 2, size: 4}]
```

#### Left joins
In some cases the two arrays might not contain the same elements. For example, the first array might have one more element:

```
const populationById = [{id: 0, population: 1}, {id: 2, population: 2}, {id: 4, population: 0}]
const sizeById = [{id: 0, size: 1}, {id: 3, size: 5}, {id: 4, size: 4}]
```
similarly to a left join and a right join in sql you can define what happens to the objects that are present in the first array and not in the second and viceversa.
In our case we might decide that is important to keep everything from first array with size 0 if missing and dismiss everything from the second array.
 In order to do that we add two more parameters to the function, leftJoin and rightJoin
 
```
const mergeJoinWith = require('merge-join-with')
const comparisonFunction = (o1, o2) => o1.id - o2.id
const joinFunction = (o1, o2) => Object.assign({}, o1, o2)
const leftJoin = o1 => Object.assign({}, o1, {size: 0})
const rightJoin = o2 => null


const populationById = [{id: 0, population: 1}, {id: 2, population: 2}, {id: 4, population: 0}]
const sizeById = [{id: 0, size: 1}, {id: 3, size: 5}, {id: 4, size: 4}]

const merge = mergeJoinWith(populationById, sizeById, comparisonFunction, joinFunction)
assert.deepEqual(merge, [{id: 0, population: 1, size: 1}, {id: 2, population: 2, size: 0}, null, {id: 4, population: 0, size: 4}]
```
If leftjoin or rightjoin are not provided as functions they default to the identity `x => x` 
