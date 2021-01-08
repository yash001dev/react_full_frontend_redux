const INITIAL_STATE={
    collections:[],
    collections2:[],
    isFetching:false,
    errorMessage:undefined,
};

const updateCollection=(existingList,data)=>{
    return existingList.map((item)=>{
        return item.city_id==data.id?{...item,city_name:data.city}:item
    });
};

const deleteCollection=(existingList,data)=>{
    console.log("DATA DELETE1:",data);
    return existingList.filter((item)=>item.select_mr!==data.select_mr && item.doctor_id!==data.doctor_id);
}
const deleteCollection2=(existingList,data)=>{
    console.log("DATA DELETE2:",existingList);
    return existingList.filter((item)=>item.select_mr!==data.select_mr && item.chemist_id!==data.chemist_id);
}

const taskReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'TASK_FETCH_COLLECTIONS_START':
            return{
                ...state,
                isFetching:true
            }
        
        case 'TASK_FETCH_COLLECTIONS_SUCCESS':
            return{
                ...state,
                isFetching:false,
                collections:action.payload
            }
        case 'TASK_FETCH_COLLECTIONS_FAILURE':
            return{
                ...state,
                isFetching:false,
                errorMessage:action.payload
            }
        case 'TASK_UPDATE_COLLECTIONS':
            return{
                ...state,
                collections:action.payload
            }
        case 'TASK_FETCH_COLLECTIONS_SUCCESS_APPEND':
            return{
                ...state,
                collections2:action.payload
            }
        case 'TASK_COLLECTION_UPDATE':
            return{
                ...state,
                collections:updateCollection(state.collections,action.payload)
            }
        case 'TASK_COLLECTION_DELETE':
            return{
                ...state,
                collections:deleteCollection(state.collections,action.payload)
            }
        case 'TASK_UPDATE_COLLECTIONS_START':
            return{
                ...state,
                isFetching:false,
            }
        case 'TASK_COLLECTION_SUCCESS':
            return{
                ...state,
                collections2:action.payload
            }
        case 'TASK_COLLECTION2_DELETE':
            return{
                ...state,
                collections2:deleteCollection2(state.collections2,action.payload)
            }
        default:
            console.log("this is called...");
            return state;

    }
};

export default taskReducer;