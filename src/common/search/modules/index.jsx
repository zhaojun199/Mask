import { Component } from 'react'
import connect from '@home/core/connect'
import { log } from '@home/core/log'
import { Input } from 'antd'
import styles from './index.less'

const { Search: SearchInput } = Input;

export default
@connect()
@log
class Search extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return <div className={styles['search-wrap']}>
            <div className={styles['search']}>
                <SearchInput
                    placeholder="搜寻一下"
                    style={{ width: 200 }}
                    size="large"
                />
            </div>
        </div>
    }
}