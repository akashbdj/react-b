import { combineReducers } from 'redux'

const app = (state = {}, action = {}) => {
    let { type, path, data } = action

    if (!type || !path) {
        return state
    }

    let next = { state }
    let cursor = next
    let key = 'state'

    for (let index = 0; index < path.length; index++) {
        switch (Object.prototype.toString.call(cursor[key])) {
            case '[object Null]':
            case '[object Undefined]':
                /**
                 *  try to guess the type from the next path component
                 *  if its an integer the type must be an array
                 */
                cursor[key] = Math.floor(path[index]) === path[index] ? [] : {}
                break

            case '[object Array]':
                cursor[key] = cursor[key].slice()
                break

            case '[object Object]':
                cursor[key] = Object.assign({}, cursor[key])
                break

            default:
                throw new Error('Attempt to set property on a primitive value')
        }

        cursor = cursor[key]
        key = path[index]
    }

    cursor[key] = action.data
    return next.state
}

export default app
