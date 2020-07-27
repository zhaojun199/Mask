import Scroll from '@home/components/UI/Scroll'
import { useEffect, useState } from 'react'

export default function VirturalList() {
    const [list, setList] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    useEffect(() => {
        const arr = []
        for (let i = 0; i < 10000; i++) {
            arr.push(<div>{i}</div>)
        }
        setList(arr)
    }, [])
    return <Scroll
        style={{ height: 600 }}
        scrollTop={scrollTop}
        scrollLeft={0}
        scroll="y"
        scrollHeight={10000}
        // scrollWidth={contentWidth}
        onScroll={(x, y, max, bar, v, h, pixelX, pixelY) => {
            console.log(x, y, max, bar, v, h, pixelX, pixelY)
            setScrollTop(y)
        }}
    >
        <div>
            {list}
        </div>
    </Scroll>;
}
