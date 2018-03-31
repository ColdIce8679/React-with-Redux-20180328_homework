export default (state = '', actions) => {
    switch (actions.type) {
        case 'getdata': 
            state = actions.data;
            return state;
        default: 
            return state;
    }
}