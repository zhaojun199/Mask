import { Component } from 'react'
import connect from '@home/core/connect'
import { log } from '@home/core/log'
import header from '@home/common/header'
import News from './News'
import styles from './index.less'

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
            <main>
                <div id="header" />
                <News />
            </main>
        );
    }
}