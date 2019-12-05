import React from 'react'
import { http } from '@home/util/http'
import { log } from '@home/core/log'
import { debounceTime } from 'rxjs/operators';

function loadingDecorator({ debounce = 500 } = {}) {

    return function (Target) {
        @log
        class Loading extends React.Component {
            constructor(props) {
                super(props)
                this.state = {
                    loading: false
                }
            }

            componentDidMount() {
                this.initSubscribe()
            }

            componentWillUnmount() {
                if (this.sub) {
                    this.sub.unsubscribe()
                }
            }

            // 初始化订阅
            initSubscribe() {
                this.sub = http.observable.pipe(debounceTime(debounce)).subscribe({
                    next: ({ loading }) => {
                        if (this.state.loading !== loading) {
                            this.setState({
                                loading,
                            })
                        }
                    }
                })
            }

            render() {
                // debugger;
                const { loading } = this.state
                return <Target {...this.props} $loading={loading} />
            }
        }

        return Loading
    }
}

export default loadingDecorator
