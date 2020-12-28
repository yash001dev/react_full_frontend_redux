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



