import { http } from '@home/util/http'
import { log } from '@home/core/log'
import { debounceTime } from 'rxjs/operators';
import style from './Loading.less'

function loadingDecorator({ debounce = 500 } = {}) {

	return function(Target) {
		@log
		class Loading extends React.Component {
			constructor(props) {
				super(props)
				this.state = {
					loading: false
				}
			}

			componentDidMount() {
				this.initSubscribe()
			}
			// 初始化订阅
			initSubscribe() {
				http.observable.pipe(debounceTime(debounce)).subscribe({
					next: ({ loading }) => {
						if (this.state.loading !== loading) {
							this.setState({
								loading,
							})
						}
					}
				})
			}

			render() {
				const { loading } = this.state
				return <div className={loading ? style.loading : style.load}>
					<Target {...this.props} />
				</div>
			}
		}

		return Loading
	}
}

export default loadingDecorator
