
const normalizeData = (dataArr, childrenPropertyName) => {
  const result = [];
  const callback = parentKey => (entries, cur) => {
    //define index key of the current entity
    const key = result.length;
    //get array children array
    let children = cur[childrenPropertyName];
    //push a new entity
    let entity = {
      ...cur,
      key,
      [childrenPropertyName] : children,
      parentKey
    };
    //push parent to result array
    result.push(entity);
    //push parent key to entries array
    entries.push(key);
    //recursively map the child if condition met
    if (children && children.length > 0) {
      entity[childrenPropertyName] = children.reduce(callback(key), []);
    }
    //return entries
    return entries;
  };

  return {
    result,
    entries: dataArr.reduce(callback(-1), [])
  };
};


const getDenormalizeMapper = (data, childrenPropertyName, leafCB, nodeCB) => {
  //construct mapper
  const mapper = i => {
    const entity = data[i];
    if (entity[childrenPropertyName] && entity[childrenPropertyName].length > 0) {
      return nodeCB(entity, mapper);
    }
    return leafCB(entity);
  };
  //return mapper
  return mapper;
};

