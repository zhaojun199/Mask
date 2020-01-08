import connect from '@home/core/connect'
import { log } from '@home/core/log'
import { Popover } from 'antd'
import styles from '../index.less'

export default
@connect()
@log
class Login extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return <div className={styles['nav-login-wrap']}>
            <div className={styles['nav-unlogin']}>
                <div className="mask-dropmenu">
                    <Popover content={123}>
                        <span className={styles['nav-login-icon']}>&nbsp;</span>
                    </Popover>
                </div>
            </div>
        </div>
    }
}