import { Component } from 'react'
import connect from '@home/core/connect'
import { log } from '@home/core/log'

export default
@connect()
@log
class News extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <section>
                123123
            </section>
        );
    }
}