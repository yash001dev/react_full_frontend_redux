const INITIAL_STATE={
    collections:[],
    isFetching:false,
    errorMessage:undefined,
};

const updateCollection=(existingList,data)=>{
    return existingList.map((item)=>{
        return item.id==data.id?{...item,name:data.name,email:data.email,city:data.city,area:data.city,number:data.number,shop_name:data.shop_name}:item
    });
};

const deleteCollection=(existingList,data)=>{
    return existingList.filter((item)=>item.id!==data);
}

const chemistReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'CHEMIST_FETCH_COLLECTIONS_START':
            return{
                ...state,
                isFetching:true
            }
        
        case 'CHEMIST_FETCH_COLLECTIONS_SUCCESS':
            return{
                ...state,
                isFetching:false,
                collections:action.payload
            }
        case 'CHEMIST_FETCH_COLLECTIONS_FAILURE':
            return{
                ...state,
                isFetching:false,
                errorMessage:action.payload
            }
        case 'CHEMIST_UPDATE_COLLECTIONS':
            return{
                ...state,
                collections:action.payload
            }
        case 'CHEMIST_COLLECTION_UPDATE':
            return{
                ...state,
                collections:updateCollection(state.collections,action.payload)
            }
        case 'CHEMIST_COLLECTION_DELETE':
            return{
                ...state,
                collections:deleteCollection(state.collections,action.payload)
            }
        case 'CHEMIST_UPDATE_COLLECTIONS_START':
            return{
                ...state,
                isFetching:false,
            }
        default:
            console.log("this is called...");
            return state;

    }
};

export default chemistReducer;