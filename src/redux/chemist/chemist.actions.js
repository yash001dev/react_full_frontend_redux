import Axios from 'axios';

//Select Collection
export const fetchCollectionsStart=()=>({
    type:'FETCH_COLLECTIONS_START',
});

export const fetchCollectionsSuccess=collectionsMap=>({
    type:'FETCH_COLLECTIONS_SUCCESS',
    payload:collectionsMap
});

export const fetchCollectionFailure=errorMessage=>({
    type:'FETCH_COLLECTIONS_FAILURE',
    payload:errorMessage
});

//Update Collection
// export const fetchUpdateStart=()=>({
//     type:'UPDATE_COLLECTIONS_START'
// });

// export const fetchUpdateSuccess=collectionMap=>({
//     type:'UPDATE_COLLECTIONS_UPDATE',
//     payload:collectionMap
// });

// export const fetchUpdateFailure=errorMessage=>({
//     type:'FETCH_COLLECTIONS_FAILURE',
//     payload:errorMessage
// });

export const updateData=item=>({
    type:'COLLECTION_UPDATE',
    payload:item
})

//Async Select
export const fetchCollectionsStartAsync=()=>{
    return dispatch=>{
        dispatch(fetchCollectionsStart());
        Axios.get('http://localhost:3001/api/chemist/get')
        .then((response)=>{
            console.log("DATA:",response);
            const collectionMap=response.data;
            console.log("dataaaaa");
            dispatch(fetchCollectionsSuccess(collectionMap));
        }).catch(error=>dispatch(fetchCollectionFailure('Something wents wrong... please try again')));
    }
}

//Async Update




