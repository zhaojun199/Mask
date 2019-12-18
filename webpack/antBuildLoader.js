function isEmpty(str) {
    // eslint-disable-next-line no-param-reassign
    str += '';
    return str.trim() === '';
}

function toLineStr(s) {
    if (s.length < 1) {
        return '';
    }
    // 将s第一个字母转小写
    const firstLetter = s[0];
    // eslint-disable-next-line no-param-reassign
    s = firstLetter.toLowerCase() + s.substr(1);
    return s.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function transAntLib(word) {
    if (word) {
        // 查找{Button, Table}等具体组件
        const compArr = word.match(/{.*?}/g);
        // console.log(compArr)
        if (compArr && compArr.length > 0) {
            let compStr = compArr[0];
            // 替换掉 {}
            compStr = compStr.replace('{', '');
            compStr = compStr.replace('}', '');
            // 从{ Button, Icon } 找出 Button、Icon
            let finalComponents = compStr.match(/\w*/g) || [];
            // 过滤掉空值
            finalComponents = finalComponents.filter(item => { return !isEmpty(item) })
            // 转化Button为 import Button from 'antd/lib/button'
            finalComponents = finalComponents.map(item => {
                return `import ${item} from 'antd/lib/${toLineStr(item)}';\r\nimport 'antd/lib/${toLineStr(item)}/style/index.less';\r\n`
            })
            return finalComponents.join('');
        }
    } else {
        return '';
    }
}

module.exports = function loader(source) {
    // 查找出 import { xxx } from 'antd'
    // 非贪婪模式匹配
    const importReg = /import.*?'antd'/g;
    // eslint-disable-next-line no-param-reassign
    source = source.replace(importReg, transAntLib);
    // console.log(source);
    return source;

}
