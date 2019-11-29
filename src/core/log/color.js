// 颜色枚举字典
const colorDic = {
    warn: {
        color: '#ff7b00',
        weight: 'bold',
    },
    debug: {
        color: '#ffb270',
        weight: 'bold',
    },
    info: {
        color: '#000000',
        weight: 'normal',
    },
    title: {
        color: '#000000',
        weight: 'bold',
    },
    gray: {
        color: 'gray',
        weight: 'lighter',
    },
    error: {
        color: 'red',
        weight: 'bold',
    },
    field: {
        color: '#2196F3',
        weight: 'bold',
    },
    normal: {
        color: 'black',
        weight: 'bold',
    },
    default: {
        color: 'black',
        weight: 'normal',
    },
};

const colorEnum = {
    warn: 'warn',
    debug: 'debug',
    info: 'info',
    title: 'title',
    gray: 'gray',
    error: 'error',
    field: 'field',
    normal: 'normal',
    default: 'default',
};

export { colorDic, colorEnum };
