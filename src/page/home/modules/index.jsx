import { Component } from 'react'
import connect from '@home/core/connect'
import { log } from '@home/core/log'
import header from '@home/common/header'

const _header = header.$cloneApp('home-header')

export default
@connect()
@log
class Home extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this._header = _header.$mount({}, { id: 'header' });
    }

    componentWillUnmount() {
        this._header.$unmount();
    }

    render() {
        return (
            <div>
                <div id="header" />
            </div>
        );
    }
}