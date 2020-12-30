const INITIAL_STATE={
    collections:[],
    isFetching:false,
    errorMessage:undefined,
};

const chemistReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'FETCH_COLLECTIONS_START':
            return{
                ...state,
                isFetching:true
            }
        
        case 'FETCH_COLLECTIONS_SUCCESS':
            return{
                ...state,
                isFetching:false,
                collections:action.payload
            }
        case 'FETCH_COLLECTIONS_FAILURE':
            return{
                ...state,
                isFetching:false,
                errorMessage:action.payload
            }
        case 'UPDATE_COLLECTIONS':
            return{
                ...state,
                collections:action.payload
            }
        default:
            console.log("this is called...");
            return state;

    }
};

export default chemistReducer;