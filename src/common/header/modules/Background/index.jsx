import connect from '@home/core/connect'
import { log } from '@home/core/log'
import styles from './index.less'

export default
@connect()
@log
class Background extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return <div className={styles.background}>
            <div className={styles.text}>一扇窗的优雅居室里的童话</div>
        </div>
    }
}