import warning from 'warning';

import { getClassName, getClassFunction } from '../util';

export default function epicClsToEpic(entry) {
    const epics = {};
    const epicNS = entry.namespace;
    warning(epicNS, `【${getClassName(entry)}】 - 未找到命名空间`);

    // warning(!this.usedNamespace.includes(epicNS), `【${getClassName(entry)}】-【${epicNS}】- 命名空间重复`)
    // this.usedNamespace.push(entry.namespace)

    const actionsName = getClassFunction(entry);

    epics[epicNS] = actionsName.map((epic) => function (action$) {
        return entry[epic](action$.ofType(`${epicNS}/${epic}`));
    });

    return epics;
}
