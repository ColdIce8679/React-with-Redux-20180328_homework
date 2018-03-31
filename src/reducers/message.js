export default (state = [], actions) => {
    switch (actions.type) {
        case 'sendmessage':
            return [...state.slice(0), actions.data];
        case 'updatemessage':
            return [
                ...state.slice(0, actions.data.k),
                Object.assign({}, state[actions.data.k], {
                    name: state[actions.data.k].name,
                    content: actions.data.newdata,
                    time: state[actions.data.k].time
                }),
                ...state.slice(actions.data.k + 1)
            ];
        case 'deletemessage':
            return [...state.slice(0, actions.data), ...state.slice(actions.data + 1)];
        default:
            return state;
    }
}