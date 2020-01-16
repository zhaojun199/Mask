import { Component } from 'react'
import connect from '@home/core/connect'
import { log } from '@home/core/log'
import styles from './index.less'

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
            <section className={styles.news}>
                <div className={styles['news-left']}>
                    <ul className={styles['news-list']}>
                        <li>1</li>
                        <li>13</li>
                        <li>14</li>
                        <li>15</li>
                        <li>16</li>
                        <li>17</li>
                    </ul>
                    <div className={styles['news-topic']}>
                    topic
                    </div>
                </div>
                <div className={styles['news-right']}>right</div>
            </section>
        );
    }
}