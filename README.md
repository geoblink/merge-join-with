# Merge join with
Outer merge of two ordered arrays.
```
var populationById = [{id: 0, population: 1}, {id: 2, population: 2}] 
var sizeById = [{id: 0, size: 1}, {id: 3, size: 4}]
```

Becomes
```
var merge = [{id: 0, population: 1, size: 1}, {id: 2, population: 2}, {id: 3, size: 4}]
```

