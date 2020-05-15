const normalizeData = (dataArr = [], childrenPropertyName) => {
    const result = [];
    const callback = (nestedDataArr, parent) => {
        const keyArr = [];
        let children, entity;
        for (let cur of nestedDataArr) {
            children = cur[childrenPropertyName] || [];
            entity = {
                ...cur,
                key: result.length,
                occupied: 1,
            };
            result.push(entity);
            keyArr.push(entity.key);
            entity[childrenPropertyName] = children.length > 0 ? callback(children, entity) : [];
            if (parent) {
                entity.parentKey = parent.key;
                parent.occupied += entity.occupied;
            } else {
                entity.parentKey = -1;
            }
        }
        return keyArr;
    };

    return {
        result,
        entries: callback(dataArr),
    };
};

const getDenormalizeMapper = (data = [], childrenPropertyName, leafCB, nodeCB) => {
    //construct mapper
    const mapper = (i) => {
        const entity = data[i];
        if (entity[childrenPropertyName] && entity[childrenPropertyName].length > 0) {
            return nodeCB ? nodeCB(entity, mapper) : leafCB(entity, mapper);
        }
        return leafCB(entity);
    };
    //return mapper
    return mapper;
};
