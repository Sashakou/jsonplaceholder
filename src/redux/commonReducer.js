
let addToken = 'addToken';

let initialState = {
    token: null,
    baseUrl: 'https://jsonplaceholder.typicode.com'
}



const commonReducer = (state = initialState, action ) => {
    console.log(state);
    //console.log('zaushlo - commonReducer');
    switch (action.type) {
        // case 'addToken' :
        //     let stateAddToken= {...state};
        //     stateAddToken.authorization = {...state.authorization};
        //     stateAddToken.authorization.userData.token = action.value;
        //     return stateAddToken;
        case 'addToken' :
            let stateAddToken= {...state};
            stateAddToken.token = action.value;
            return stateAddToken;

        default:
            return state;
    }
}

export const addTokenCreator = (value) => {
    return {
        type: addToken, value: value
    }
}


export default commonReducer;


