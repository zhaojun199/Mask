// 将多个函数连接起来，将一个函数的返回值作为另一个函数的传参进行计算
export default function compose(...funcs) {
    if (funcs.length === 0) {
        return (arg) => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
