import md5 from 'md5';
import colorReverse from 'font-color-contrast';

const CACHE_COLOR = {};
const CACHE_REVERSE_COLOR = {};

export default function genColorByMD5(name = '') {

    let color, reverseColor;

    if (CACHE_COLOR[name]) {

        color = CACHE_COLOR[name];
        reverseColor = CACHE_REVERSE_COLOR[name];

    } else {

        const md5Res = md5(name);
        color = md5Res.substring(md5Res.length - 6);
        reverseColor = colorReverse(`#${color}`);

        if (reverseColor === '#ffffff') {
            reverseColor = '#3296f9';
        } else {
            reverseColor = `#${color}`;
        }

        CACHE_COLOR[name] = color;
        CACHE_REVERSE_COLOR[name] = reverseColor;
    }

    return `color: ${reverseColor}`;
}