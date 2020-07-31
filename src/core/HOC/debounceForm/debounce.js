export default function debounce(fn, ms) {
    let tid;
    return function (...args) {
        const context = this
        if (tid) {
            clearTimeout(tid)
        } else {
            tid = setTimeout(() => {
                fn.apply(context, args)
            }, ms)
        }
    }
}