const INITIAL_STATE={
    collections:[],
    isFetching:false,
    errorMessage:undefined,
};

const updateCollection=(existingList,data)=>{
    return existingList.map((item)=>{
        return item.worktype_id==data.id?{...item,worktype_name:data.worktype}:item
    });
};

const deleteCollection=(existingList,data)=>{
    console.log("DATA DELETE:",existingList);
    return existingList.filter((item)=>item.worktype_id!==data);
}

const workTypeReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'WORKTYPE_FETCH_COLLECTIONS_START':
            return{
                ...state,
                isFetching:true
            }
        
        case 'WORKTYPE_FETCH_COLLECTIONS_SUCCESS':
            return{
                ...state,
                isFetching:false,
                collections:action.payload
            }
        case 'WORKTYPE_FETCH_COLLECTIONS_FAILURE':
            return{
                ...state,
                isFetching:false,
                errorMessage:action.payload
            }
        case 'WORKTYPE_UPDATE_COLLECTIONS':
            return{
                ...state,
                collections:action.payload
            }
        case 'WORKTYPE_COLLECTION_UPDATE':
            return{
                ...state,
                collections:updateCollection(state.collections,action.payload)
            }
        case 'WORKTYPE_COLLECTION_DELETE':
            return{
                ...state,
                collections:deleteCollection(state.collections,action.payload)
            }
        case 'WORKTYPE_UPDATE_COLLECTIONS_START':
            return{
                ...state,
                isFetching:false,
            }
        default:
            console.log("this is called...");
            return state;

    }
};

export default workTypeReducer;