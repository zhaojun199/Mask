import { useState } from 'react'
import debounceForm from '@home/core/HOC/debounceForm'
import Input from '@home/components/UI/Input'
import { Logger } from '@home/core/log';

const log = new Logger();
const DInput = debounceForm()(Input)

export default function (props) {
    const [value, setValue] = useState();
    const onChange = (e) => {
        setValue(e)
        log.log(e)
    }
    const onClick = () => {
        setValue(Math.random(1).toFixed(5))
    }
    return [<DInput
        onChange={onChange}
        value={value}
    />, <button onClick={onClick}>改变value</button>]
}
