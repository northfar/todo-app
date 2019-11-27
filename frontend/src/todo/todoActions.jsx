import api from '../services/api'

export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

/*export const search = () => {
    const request = api.get('/todos?sort=-createdAt')
    return{
        type: 'TODO_SEARCHED',
        payload: request
    }
}*/

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description // Ñ recomendado
        const search = description ? `&description__regex=/${description}/` : ''
        const request = api.get(`/todos?sort=-createdAt${search}`)
           .then(res => dispatch({type: 'TODO_SEARCHED', payload: res.data}))
    }
}

/*export const add = description => {
    const request = api.post('/todos', {description})
    return [
        {type:'TODO_ADDED',payload: request},
        search()
    ]
}*/

export const add = description =>{
    return dispatch => {
        api.post('/todos', {description})
            .then(res => dispatch(clear()))
            .then(res => dispatch(search()))
    }
}

export const markAsDone = todo =>{
    return dispatch => {
        api.put(`/todos/${todo._id}`, {...todo, done: true})
           .then(res => dispatch(search()))
    }
}

export const markAsPending = todo =>{
    return dispatch => {
        api.put(`/todos/${todo._id}`, {...todo, done: false})
           .then(res => dispatch(search()))
    }
}

export const remove = todo => {
    return dispatch => {
        api.delete(`/todos/${todo._id}`)
            .then(dispatch(search()))
    }
}

export const clear = () =>{
    return ([ {type: 'TODO_CLEAR'}, search()])
}