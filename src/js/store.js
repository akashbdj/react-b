import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'app/js/reducers'

export default function configureStore (initialState) {
    const devTool = window.__REDUX_DEVTOOLS_EXTENSION__
    return createStore(rootReducer, initialState, (devTool && devTool()))
}
