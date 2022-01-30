import _ from 'lodash';
import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from '../actions/types'
import streams from '../apis/streams';

export default (state ={}, action)=>{
    switch(action.type){
       case FETCH_STREAM:
           return {...state,[action.payload.id]:action.payload};
       case CREATE_STREAM:
           return {...state,[action.payload.id]:action.payload};
       case EDIT_STREAM:
           return {...state,[action.payload.id]:action.payload};
       case DELETE_STREAM:
            return _.omit(state,action.payload); // no three dots bc omit creating new object
        case FETCH_STREAMS:
            return{...state,..._.mapKeys(action.payload,'id')};
       
       
        default:
            return state;
    }
};