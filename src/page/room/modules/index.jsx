import { Component } from 'react'
import connect from '@home/core/connect'
import { log } from '@home/core/log'
import Launcher from '@home/core/launcher'
import multipleDispatch from '@home/page/multipleDispatch'
import loading from '@home/core/inject/Loading'
import Loading from '@home/components/Loading'
import demoService from '../services/demo'

export default
@loading({ debounce: 300 })
@connect()
@log
class AAA extends Component {
    @Launcher.Service(demoService)
    demoService

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // service用于处理异步事件完成后的动作
        this.getInfo()
        // .subscribe((res) => {
        //     console.log('service finished', res)
        // })
    }

    getInfo = () => {
        return this.demoService
            .getInfo()
    }

    pingEpic = () => {
        this.props.dispatch({
            type: 'list/fetchList',
            payload: {
                id: (this.props.list?.login || 0) + 1,
            },
        });
    }

    mount = () => {
        this.multipleDispatch = multipleDispatch.$mount();
    }

    unmount = () => {
        this.multipleDispatch.$unmount();
    }

    render() {
        return <Loading loading={this.props.$loading}>
            <span>room</span>
            <div>testStr: {this.props.testStr}</div>
            <button onClick={this.pingEpic}>epic</button>
            <button onClick={this.getInfo}>service</button>
            <span> </span>
            <button onClick={this.mount}>mount</button>
            <span> </span>
            <button onClick={this.unmount}>unmount</button>
            <div>
                id: {this.props.list?.login}
            </div>
            <div>loading: {this.props.$loading.toString()}</div>
        </Loading>
    }
}