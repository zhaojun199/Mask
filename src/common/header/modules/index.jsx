import { Component } from 'react'
import connect from '@home/core/connect'
import { log } from '@home/core/log'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'
import Background from './Background'

export default
@connect()
@log
class Header extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return <div>
            <Swiper>
                <div><Background /></div>
                <div><Background /></div>
            </Swiper>
        </div>
    }
}