// 获取dom数量
export function getDomLength() {
    return document.getElementsByTagName('*').length;
}

window.$$getDomLength = getDomLength;
