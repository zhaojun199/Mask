import { Component, Fragment } from 'react';
import GenRouter from '@home/router/GenRouter';
import { log } from '@home/core/log';

// import room from '@home/page/room'

// const A1 = room.$cloneApp('xxx')
// const A2 = room.$cloneApp()
// const A3 = room.$cloneApp()

// A1.$mount()
// room.$mount()
// setTimeout(A1.$unmount, 3000)

export default
@log
class App extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <Fragment>
                {new GenRouter().render()}
                {/* <A1></A1>
                <A2></A2>
                <A3></A3> */}
            </Fragment>
        );
    }
}
