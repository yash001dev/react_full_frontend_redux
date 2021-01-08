import axios from 'axios';

//Select Collection
export const fetchCollectionsStart=()=>({
    type:'TASK_FETCH_COLLECTIONS_START',
});

export const fetchCollectionsSuccess=collectionsMap=>({
    type:'TASK_FETCH_COLLECTIONS_SUCCESS',
    payload:collectionsMap
});

export const fetchCollectionFailure=errorMessage=>({
    type:'TASK_FETCH_COLLECTIONS_FAILURE',
    payload:errorMessage
});

export const updateData=item=>({
    type:'TASK_COLLECTION_UPDATE',
    payload:item
});

export const deleteData1=item=>({
    type:'TASK_COLLECTION_DELETE',
    payload:item
});

export const deleteData2=item=>({
    type:'TASK_COLLECTION2_DELETE',
    payload:item
});

//Update Collection
export const updateCollectionsStart=()=>({
    type:'TASK_UPDATE_COLLECTIONS_START',
});

export const appendCollectionsStart=collectionsMap=>({
    type:'TASK_COLLECTION_SUCCESS',
    payload:collectionsMap
});

// export const updateCollectionsSuccess=collectionsMap=>({
//     type:'CHEMIST_FETCH_COLLECTIONS_SUCCESS',
//     payload:collectionsMap
// });

// export const updateCollectionFailure=errorMessage=>({
//     type:'CHEMIST_FETCH_COLLECTIONS_FAILURE',
//     payload:errorMessage
// });


//Async Select
export const fetchCollectionsStartAsync=()=>{
    return dispatch=>{
        dispatch(fetchCollectionsStart());
        axios.get('http://localhost:3001/api/task/doctor/get')
        .then((response)=>{
            console.log("RESPONSEDATADOCTOR:",response);
            const collectionMap=response.data;
            console.log("dataaaaa:",collectionMap);
            dispatch(fetchCollectionsSuccess(collectionMap));
        }).catch(error=>dispatch(fetchCollectionFailure('Something wents wrong... please try again')));
    }
}

export const fetchCollectionsAppendStartAsync=()=>{
    return dispatch=>{
        dispatch(fetchCollectionsStart());
        axios.get('http://localhost:3001/api/task/chemist/get')
        .then((response)=>{
            console.log("RESPONSEDATACHEMIST:",response);
            const collectionMap=response.data;
            console.log("dataaaaa:",collectionMap);
            dispatch(appendCollectionsStart(collectionMap));
        }).catch(error=>dispatch(fetchCollectionFailure('Something wents wrong... please try again')));
    }
}



export const updateCollectionsStartAsync=(item)=>{
    
    return dispatch=>{
        dispatch(updateCollectionsStart());
        axios.put('http://localhost:3001/api/task/update',item)
        .then((res)=>{
            dispatch(fetchCollectionsStartAsync(item))
        })
        .catch(error=>dispatch(fetchCollectionFailure('Something wents wrong... please try again')));
    }
}


//Handle Error
function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
}