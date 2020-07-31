export default {
    trigger: 'onChange', // 收集子节点的值的时机
    valuePropName: 'value', //  子节点的值的属性，如 Switch 的是 'checked'
    triggerMs: 2000, // 收集子节点的值的延迟，单位 ms
    getValueFromEvent: (e) => {
        if (!e || !e.target) {
            return e;
        }
        const { target } = e;
        return target.value;
    }, //  从event获取value
}