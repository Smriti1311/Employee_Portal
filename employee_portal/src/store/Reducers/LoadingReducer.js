const initialState = {
    loading : false
}

const LoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_DATA':
            console.log('LOADing data');
            return({ ...state,
                loading : true
            })    
        case 'LOADING_DONE':
            return({
                ...state,
                loading : false
            })
        default:
            return state;
    }
}

export default LoadingReducer;