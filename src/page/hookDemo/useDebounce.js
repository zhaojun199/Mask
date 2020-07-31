
import { useEffect, useRef } from 'react'

const useDebounce = (fn, ms = 30, deps = []) => {
    let timeout = useRef()
    useEffect(() => {
        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(() => {
            fn.apply(window, deps)
        }, ms)
    }, deps)

    const cancel = () => {
        clearTimeout(timeout.current)
        timeout = null
    }

    return [cancel]
}

export default useDebounce