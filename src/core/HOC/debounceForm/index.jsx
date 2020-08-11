// rewrire from https://github.com/fgfg163/react-component-debounce/blob/master/src/index.jsx
import { Component, PureComponent } from 'react'
import { log } from '@home/core/log';
import defaultOption from './defaultOption'
import debounce from './debounce'

// const log = new Logger();

export default function (options) {
    const _options = {
        ...defaultOption,
        ...options,
    }
    const {
        valuePropName,
        trigger,
        triggerMs,
        getValueFromEvent,
    } = _options;
    return function (ReactComponent) {
        @log
        class DebounceFormComponent extends PureComponent {
            static getDerivedStateFromProps(nextProps, prevState) {
                if (nextProps[valuePropName] !== prevState[valuePropName]) {
                    return {
                        [valuePropName]: nextProps[valuePropName],
                    }
                }
                return null
            }

            constructor(props) {
                super(props)
                this.state = {
                    [valuePropName]: props[valuePropName],
                }
                this.handleChange = this.handleChange.bind(this)
                this.handlePropsChange = this.handlePropsChange.bind(this)
            }

            // 用getDerivedStateFromProps替代
            // componentWillReceiveProps(nextProps) {
            //     if (nextProps[valuePropName] !== this.props[valuePropName]) {
            //         this.setState({
            //             [valuePropName]: nextProps[valuePropName]
            //         })
            //     }
            // }

            // shouldComponentUpdate(nextProps, nextState) {
            //     if (nextProps[valuePropName] !== nextState[valuePropName]) {
            //         return true
            //     }
            //     if (nextState !== this.state) {
            //         return true
            //     }
            //     return false
            // }

            handlePropsChange(value) {
                let debounceChange = this.props[trigger]
                if (triggerMs >= 0) {
                    debounceChange = debounce(this.props[trigger], triggerMs)
                }

                debounceChange(value)
            }

            handleChange(event) {
                const value = getValueFromEvent(event)
                this.setState({
                    [valuePropName]: value,
                })
                this.handlePropsChange(value)
            }

            render() {
                const reWriteProps = {
                    [valuePropName]: this.state[valuePropName],
                    [trigger]: this.handleChange,
                }
                return <ReactComponent
                    {...this.props}
                    {...reWriteProps}
                />
            }
        }
        return DebounceFormComponent
    }
}
