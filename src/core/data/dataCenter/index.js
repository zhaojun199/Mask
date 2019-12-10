import { createStore } from 'redux'

function reducer(state = {}, action) {
    switch (action.type) {
    case 'APPLY':
        return {
            ...state,
            ...action.payload,
        }
    default:
        return state
    }
}

const store = createStore(reducer)

export default store
