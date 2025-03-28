import * as React from 'react';
import { groupKeysMap } from '../../_util/transKeys';
const useData = (dataSource, rowKey, targetKeys) => {
  const mergedDataSource = React.useMemo(() => (dataSource || []).map(record => {
    if (rowKey) {
      return Object.assign(Object.assign({}, record), {
        key: rowKey(record)
      });
    }
    return record;
  }), [dataSource, rowKey]);
  const [leftDataSource, rightDataSource] = React.useMemo(() => {
    var _a;
    const leftData = [];
    const rightData = Array.from({
      length: (_a = targetKeys === null || targetKeys === void 0 ? void 0 : targetKeys.length) !== null && _a !== void 0 ? _a : 0
    });
    const targetKeysMap = groupKeysMap(targetKeys || []);
    mergedDataSource.forEach(record => {
      // rightData should be ordered by targetKeys
      // leftData should be ordered by dataSource
      if (targetKeysMap.has(record.key)) {
        const idx = targetKeysMap.get(record.key);
        rightData[idx] = record;
      } else {
        leftData.push(record);
      }
    });
    return [leftData, rightData];
  }, [mergedDataSource, targetKeys]);
  return [mergedDataSource, leftDataSource.filter(Boolean), rightDataSource.filter(Boolean)];
};
export default useData;