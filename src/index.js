import { render } from 'react-dom'
import { Provider } from 'react-redux'
import '@home/core/apm/error'
import '@home/core/apm/performance'
import '@home/util/log'
import Store from '@home/core/Store'
import App from '@home/page/App'
import factory from '@home/core/factory'
import democtrl1 from '@home/controller/demo.ctrl'
import democtrl2 from '@home/controller/demo2.ctrl'
import demoepic from '@home/epics/demo.epic'

factory({ ctrl: democtrl1, epic: demoepic, namespace: 'demo' })
factory({ ctrl: democtrl2, namespace: 'demo2' })

const store = new Store()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
