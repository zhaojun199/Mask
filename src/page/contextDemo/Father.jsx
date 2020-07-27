import { Component } from 'react'
import { Logger } from '@home/core/log';
import ctxContainer from './ctxContainer'

const log = new Logger();

export default class Father extends Component {

    constructor(props) {
        super(props)
        this.state = {
            line: 1,
        }
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeState = this.onChangeState.bind(this)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        log.log('componentWillReceiveProps', nextProps, nextContext, this.context)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        log.log('shouldComponentUpdate', nextProps, nextContext, this.context)
    }

    onChangeName() {
        this.context.setName(this.context.name + ` ${Math.random(1).toFixed(2) * 100}`)
    }

    onChangeState() {
        this.setState((preState) => {
            return { line: preState.line + 1 }
        })
    }

    static contextType = ctxContainer

    render() {
        return <div>
            {this.context.name}
            <button onClick={this.onChangeName}>改变name</button>
            <button onClick={this.onChangeState}>改变state</button>
        </div>
    }
}