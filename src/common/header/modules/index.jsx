import { Component } from 'react'
import connect from '@home/core/connect'
import { log } from '@home/core/log'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'
import Background from './Background'
import Navigator from './Navigator'

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
        return <div className="header">
            {/* <Swiper>
                <div><Background /></div>
                <div><Background /></div>
            </Swiper> */}
            <Navigator />
            <img src={require('./bg.png')} alt="" style={{ position: 'fixed', top: 68, zIndex: -1 }} />
        </div>
    }
}