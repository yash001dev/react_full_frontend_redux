const INITIAL_STATE={
    collections:[],
    isFetching:false,
    errorMessage:undefined,
};

const updateCollection=(existingList,data)=>{
    return existingList.map((item)=>{
        return item.holiday_id==data.id?{...item,holiday_name:data.holiday}:item
    });
};

const deleteCollection=(existingList,data)=>{
    console.log("DATA DELETE:",existingList);
    return existingList.filter((item)=>item.holiday_id!==data);
}

const holidayReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'HOLIDAY_FETCH_COLLECTIONS_START':
            return{
                ...state,
                isFetching:true
            }
        
        case 'HOLIDAY_FETCH_COLLECTIONS_SUCCESS':
            return{
                ...state,
                isFetching:false,
                collections:action.payload
            }
        case 'HOLIDAY_FETCH_COLLECTIONS_FAILURE':
            return{
                ...state,
                isFetching:false,
                errorMessage:action.payload
            }
        case 'HOLIDAY_UPDATE_COLLECTIONS':
            return{
                ...state,
                collections:action.payload
            }
        case 'HOLIDAY_COLLECTION_UPDATE':
            return{
                ...state,
                collections:updateCollection(state.collections,action.payload)
            }
        case 'HOLIDAY_COLLECTION_DELETE':
            return{
                ...state,
                collections:deleteCollection(state.collections,action.payload)
            }
        case 'HOLIDAY_UPDATE_COLLECTIONS_START':
            return{
                ...state,
                isFetching:false,
            }
        default:
            console.log("this is called...");
            return state;

    }
};

export default holidayReducer;