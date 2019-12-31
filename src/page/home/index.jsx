import { Component } from 'react';
import { log } from '@home/core/log';
import header from '@home/common/header'

const _header = header.$cloneApp('home-header')

@log
class Home extends Component {
    componentDidMount() {
        this._header = _header.$mount();
    }

    render() {
        return (
            <div>
                <div id="header" />
            </div>
        );
    }
}

export default Home
