import axios from 'axios';

//Select Collection
export const fetchCollectionsStart=()=>({
    type:'WORKTYPE_FETCH_COLLECTIONS_START',
});

export const fetchCollectionsSuccess=collectionsMap=>({
    type:'WORKTYPE_FETCH_COLLECTIONS_SUCCESS',
    payload:collectionsMap
});

export const fetchCollectionFailure=errorMessage=>({
    type:'WORKTYPE_FETCH_COLLECTIONS_FAILURE',
    payload:errorMessage
});

export const updateData=item=>({
    type:'WORKTYPE_COLLECTION_UPDATE',
    payload:item
});

export const deleteData=item=>({
    type:'WORKTYPE_COLLECTION_DELETE',
    payload:item
});

//Update Collection
export const updateCollectionsStart=()=>({
    type:'WORKTYPE_UPDATE_COLLECTIONS_START',
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
        axios.get('http://localhost:3001/api/worktype/get')
        .then((response)=>{
            console.log("RESPONSEDATA:",response);
            const collectionMap=response.data;
            console.log("dataaaaa:",collectionMap);
            dispatch(fetchCollectionsSuccess(collectionMap));
        }).catch(error=>dispatch(fetchCollectionFailure('Something wents wrong... please try again')));
            // dispatch(fetchCollectionsStart());
            // return fetch("http://localhost:3001/api/chemist/get")
            //   .then(handleErrors)
            //   .then(res => res.json())
            //   .then(json => {
            //     console.log("JSON:",json);
            //     dispatch(fetchCollectionsSuccess(json));
            //     return json;
            //   })
            //   .catch(error => dispatch(fetchCollectionFailure('Somethin wents wrong... please try again ')));
        
    }
}

export const updateCollectionsStartAsync=(item)=>{
    // dispatch(updateCollectionsStart);
    //     axios.get('http://localhost:3001/api/chemist/get')
    //     .then((response)=>{
    //         console.log("RESPONSEDATA:",response);
    //         const collectionMap=response.data;
    //         console.log("dataaaaa:",collectionMap);
    //         dispatch(updateCollectionsSuccess(collectionMap));
    //     }).catch(error=>dispatch(fetchCollectionFailure('Something wents wrong... please try again')));
    return dispatch=>{
        dispatch(updateCollectionsStart());
        axios.put('http://localhost:3001/api/worktype/update',item)
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