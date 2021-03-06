// 添加px字符

const IS_UNITLESS = {
    animationIterationCount: true,

    boxFlex: true,

    boxFlexGroup: true,

    boxOrdinalGroup: true,

    columnCount: true,

    flex: true,

    flexGrow: true,

    flexPositive: true,

    flexShrink: true,

    flexNegative: true,

    flexOrder: true,

    gridRow: true,

    gridColumn: true,

    fontWeight: true,

    lineClamp: true,

    lineHeight: true,

    opacity: true,

    order: true,

    orphans: true,

    tabSize: true,

    widows: true,

    zIndex: true,

    zoom: true,

    // SVG-related properties

    fillOpacity: true,

    stopOpacity: true,

    strokeDashoffset: true,

    strokeOpacity: true,

    strokeWidth: true
};

export default function (name, value) {
    if (typeof value === 'number' && !IS_UNITLESS[name]) {
        return `${value}px`;
    }

    return value;
}
