import { Component } from 'react';
import { log } from '@home/core/log';
import header from '@home/common/header'

const _header = header.$cloneApp('home-header')

@log
class Home extends Component {
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

export default Home
