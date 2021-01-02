
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

export const updateData=item=>({
    type:'COLLECTION_UPDATE',
    payload:item
});

export const deleteData=item=>({
    type:'COLLECTION_DELETE',
    payload:item
});

//Async Select
export const fetchCollectionsStartAsync=()=>{
    return dispatch=>{
            dispatch(fetchCollectionsStart());
            return fetch("http://localhost:3001/api/senior/get")
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

