
//Select Collection
export const fetchCollectionsStart=()=>({
    type:'MR_FETCH_COLLECTIONS_START',
});

export const fetchCollectionsSuccess=collectionsMap=>({
    type:'MR_FETCH_COLLECTIONS_SUCCESS',
    payload:collectionsMap
});

export const fetchCollectionFailure=errorMessage=>({
    type:'MR_FETCH_COLLECTIONS_FAILURE',
    payload:errorMessage
});

export const updateData=item=>({
    type:'MR_COLLECTION_UPDATE',
    payload:item
});

export const deleteData=item=>({
    type:'MR_COLLECTION_DELETE',
    payload:item
});

//Async Select
export const fetchCollectionsStartAsync=()=>{
    return dispatch=>{
        // dispatch(fetchCollectionsStart());
        // Axios.get('http://localhost:3001/api/chemist/get')
        // .then((response)=>{
        //     console.log("RESPONSEDATA:",response);
        //     const collectionMap=response.data;
        //     console.log("dataaaaa:",collectionMap);
        //     dispatch(fetchCollectionsSuccess(collectionMap));
        // }).catch(error=>dispatch(fetchCollectionFailure('Something wents wrong... please try again')));
            dispatch(fetchCollectionsStart());
            return fetch("http://localhost:3001/api/mr/get")
              .then(handleErrors)
              .then(res => res.json())
              .then(json => {
                console.log("JSON:",json);
                dispatch(fetchCollectionsSuccess(json));
                return json;
              })
              .catch(error => dispatch(fetchCollectionFailure('Somethin wents wrong... please try again ')));
        
    }
}


//Handle Error
function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
}

//Async Update

