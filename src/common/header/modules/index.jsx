import { Component } from 'react'
import connect from '@home/core/connect'
import { log } from '@home/core/log'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'

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
                <div>Slide 1</div>
                <div>Slide 2</div>
                <div>Slide 3</div>
                <div>Slide 4</div>
                <div>Slide 5</div>
            </Swiper>
        </div>
    }
}