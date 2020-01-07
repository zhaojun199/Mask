import connect from '@home/core/connect'
import { log } from '@home/core/log'
import styles from './index.less'

export default
@connect()
@log
class Navigator extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return <div className={styles['nav-warp']}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <img src="https://www.zhuoyou.com/web/images/logo.png" alt="" />
                </div>
                <div className={styles['nav-menu-wrap']}>
                    <ul className={styles['nav-menu']}>
                        <li
                            className={styles['nav-menu-link']}
                        ><a href="#">首页</a></li>
                        <li
                            className={styles['nav-menu-link']}
                        ><a href="#">商城</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    }
}