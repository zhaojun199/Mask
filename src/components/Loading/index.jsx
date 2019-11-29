import style from './index.less'

export default class Loading extends React.PureComponent {
    render() {
        const { loading = true, children } = this.props
        return <div className={loading ? style.loading : null}>
            {children}
        </div>
    }
}