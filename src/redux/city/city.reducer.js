const INITIAL_STATE={
    collections:[],
    isFetching:false,
    errorMessage:undefined,
};

const updateCollection=(existingList,data)=>{
    return existingList.map((item)=>{
        return item.city_id==data.id?{...item,city_name:data.city}:item
    });
};

const deleteCollection=(existingList,data)=>{
    console.log("DATA DELETE:",existingList);
    return existingList.filter((item)=>item.city_id!==data);
}

const cityReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'CITY_FETCH_COLLECTIONS_START':
            return{
                ...state,
                isFetching:true
            }
        
        case 'CITY_FETCH_COLLECTIONS_SUCCESS':
            return{
                ...state,
                isFetching:false,
                collections:action.payload
            }
        case 'CITY_FETCH_COLLECTIONS_FAILURE':
            return{
                ...state,
                isFetching:false,
                errorMessage:action.payload
            }
        case 'CITY_UPDATE_COLLECTIONS':
            return{
                ...state,
                collections:action.payload
            }
        case 'CITY_COLLECTION_UPDATE':
            return{
                ...state,
                collections:updateCollection(state.collections,action.payload)
            }
        case 'CITY_COLLECTION_DELETE':
            return{
                ...state,
                collections:deleteCollection(state.collections,action.payload)
            }
        case 'CITY_UPDATE_COLLECTIONS_START':
            return{
                ...state,
                isFetching:false,
            }
        default:
            console.log("this is called...");
            return state;

    }
};

export default cityReducer;