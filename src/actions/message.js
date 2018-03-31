export const getapidata = () => {
    return (dispatch, getState, { api }) => {
        api.getdata().then(value => {
            dispatch({
                type: 'getdata',
                data: value.data
            })
        })
    }
}

export const sendMessage = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'sendmessage',
            data: data
        })
    }
}

export const updatemessage = (newdata, k) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'updatemessage',
            data: { newdata, k }
        })
    }
}

export const deletemessage = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'deletemessage',
            data: data
        })
    }
}
