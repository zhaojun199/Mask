import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '@home/core/configureStore'
import App from '@home/page/App'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)