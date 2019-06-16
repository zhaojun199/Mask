import { render } from 'react-dom'
import { Provider } from 'react-redux'
import '@home/util/log'
import Store from '@home/core/Store'
import App from '@home/page/App'

const store = new Store()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
