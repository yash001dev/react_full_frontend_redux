import Axios from 'axios';

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

export const fetchCollectionsStartAsync=()=>{
    return dispatch=>{
        dispatch(fetchCollectionsStart());
        Axios.get('http://localhost:3001/api/chemist/get')
        .then((response)=>{
            const collectionMap=response.data;
            console.log("dataaaaa");
            dispatch(fetchCollectionsSuccess(collectionMap));
        }).catch(error=>dispatch(fetchCollectionFailure('Something wents wrong... please try again')));
    }
}



