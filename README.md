# js-tree-normalizer
A lightweight Javascript library used for normalize and denormalize tree data structure! Required support for ES6 Syntax.

# Demo 
See demo.html or click [here](http://www.wztechs.com/js-tree-normalizer/demo.html)

# How to Use
* Download normalizer.js from the package and import it into your javascript project
* Import two functions from normalizer.js, normalizeData and getDenormalizeMapper

## Normalize Data (normalizeData)
The return result will be a object of questions and entires
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
            "key": 0,
            "parentKey": -1
        },
        {
            "title": "node 1-1",
            "nodes": [],
            "key": 1,
            "parentKey": 0
        },
        {
            "title": "node 1-2",
            "nodes": [
                3,
                4
            ],
            "key": 2,
            "parentKey": 0
        },
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
        },
        {
            "title": "node 2",
            "nodes": [],
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
