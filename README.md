# js-tree-normalizer
A lightweight Javascript library used for normalize and denormalize tree data structure! Required support for ES6 Syntax.


# How to Use
* Download normalizer.js from the package and place it into your javascript project
* In js file, import {normalizeData, getDenormalizeMapper} from '.../normalizer'

## Normalize Data
The return result will be a object of questions and entires
```
const {
    result //normalized data array,
    entries //the entries of the normalized data
} = normalizeData( OriginalDataArray, ChildrenPropertyNameString );
```

## Denormalize Data
getDenormalizeMapper returns a callback function for Array.map
```
const denormalizedData = entries.map(
    getDenormalizeMapper(
        normalizedData, //first parameter take normalizedData array
        entities => {...entities}, //second parameter take a callback function for mapping leaf
        (entities, mapper) => ({   //second parameter take a callback function for mapping node
          ...entities,
          children: entities.children.map(mapper)
        })
      )
  )
)
```
# Demo 
download demo.html and open it for testing
