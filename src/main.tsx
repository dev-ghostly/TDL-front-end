import ReactDOM from 'react-dom/client'
import './index.css'
import {store} from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <h1>Home</h1>
  </Provider>,
)
