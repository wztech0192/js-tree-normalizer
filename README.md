# js-tree-normalizer
A lightweight Javascript library used for normalize and denormalize tree data structure! Required support for ES6 Syntax.

# Demo 
See demo.html or click [here](http://www.wztechs.com/js-tree-normalizer/demo.html)

# How to Use
* Download normalizer.js from the package and import it into your javascript project
* Import two functions from normalizer.js, normalizeData and getDenormalizeMapper

## Normalized Object Preview
```
node:{
 "occupied": "the total index occupied by the branch, included the count of all nested children"
 "key": "the index of this node in the normalized result array",
 "parentKey": "the index of the parent node in the normalized result array",
 "childrenPropertyName": "array of indexes of the children node in the normalized result array",
 ...otherProperties
}
```

## Normalize Data (normalizeData)
The return result will be a object of questions and entires.
```
const {
    result //normalized data array,
    entries //the entries of the normalized data
} = normalizeData( OriginalDataArray, ChildrenPropertyNameString );

```

## Denormalize Data (getDenormalizeMapper)
getDenormalizeMapper returns a callback function for Array.map
```
const denormalizedData = entries.map(
    getDenormalizeMapper(
        normalizedData, //first parameter take normalizedData array
        childPropertyName, //second parameter take the property name of the nested children
        entities => {...entities}, //third parameter take a callback function for mapping leaf
        (entities, mapper) => ({   //fourth parameter take a callback function for mapping node
          ...entities,
          children: entities.children.map(mapper)
        })
      )
  )
)

//or

const denormalizedData = entries.map(
    getDenormalizeMapper(
        normalizedData, //first parameter take normalizedData array
        childPropertyName, //second parameter take the property name of the nested children
        (entities, mapper) => mapper ?{   //mapper param is not null indicates the node is a leaf
          ...entities,
          children: entities.children.map(mapper)
        } : {...entities }
      )
  )
)

```

# Example

## Data HTML Display, (Using Normalized Structure)
* node 1
  * node 1-1
  * node 1-2
    * node 1-2-1
    * node 1-2-2
* node 2

## Original Data
```
[
    {
        "title": "node 1",
        "nodes": [
            {
                "title": "node 1-1",
                "nodes": []
            },
            {
                "title": "node 1-2",
                "nodes": [
                    {
                        "title": "node 1-2-1",
                        "nodes": []
                    },
                    {
                        "title": "node 1-2-2",
                        "nodes": []
                    }
                ]
            }
        ]
    },
    {
        "title": "node 2",
        "nodes": []
    }
]
```

## Normalized Data
```
{
    "result": [
        {
            "title": "node 1",
            "nodes": [
                1,
                2
            ],
            "occupied": 5,
            "key": 0,
            "parentKey": -1
        },
        {
            "title": "node 1-1",
            "nodes": [],
            "occupied":1,
            "key": 1,
            "parentKey": 0

        },
        {
            "title": "node 1-2",
            "nodes": [
                3,
                4
            ],
            "occupied":3,
            "key": 2,
            "parentKey": 0
        },
        {
            "title": "node 1-2-1",
            "nodes": [],
            "occupied":1,
            "key": 3,
            "parentKey": 2
        },
        {
            "title": "node 1-2-2",
            "nodes": [],
            "occupied":1,
            "key": 4,
            "parentKey": 2
        },
        {
            "title": "node 2",
            "nodes": [],
            "occupied":1,
            "key": 5,
            "parentKey": -1
        }
    ],
    "entries": [
        0,
        5
    ]
}
```

## Denormalized Data
```
[
    {
        "title": "node 1",
        "nodes": [
            {
                "title": "node 1-1",
                "nodes": [],
                "key": 1,
                "parentKey": 0
            },
            {
                "title": "node 1-2",
                "nodes": [
                    {
                        "title": "node 1-2-1",
                        "nodes": [],
                        "key": 3,
                        "parentKey": 2
                    },
                    {
                        "title": "node 1-2-2",
                        "nodes": [],
                        "key": 4,
                        "parentKey": 2
                    }
                ],
                "key": 2,
                "parentKey": 0
            }
        ],
        "key": 0,
        "parentKey": -1
    },
    {
        "title": "node 2",
        "nodes": [],
        "key": 5,
        "parentKey": -1
    }
]

```
