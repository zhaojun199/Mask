import connect from '@home/core/connect'
import { log } from '@home/core/log'
import { Popover, Button } from 'antd'
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

    renderUnlogin() {
        return <div className={styles['unlogin-content']}>
            <h3>登录或注册，使用更丰富的功能哦~</h3>
            <Button type="primary" style={{ marginLeft: 7 }}>登录</Button>
            <Button style={{ marginLeft: 8 }}>注册</Button>
        </div>
    }

    render() {
        return <div className={styles['login-wrap']}>
            <div className={styles['unlogin']}>
                <div className="mask-dropmenu">
                    <Popover placement="topRight" content={this.renderUnlogin()}>
                        <span className={styles['login-icon']}>&nbsp;</span>
                    </Popover>
                </div>
            </div>
        </div>
    }
}