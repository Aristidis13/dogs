import {Action} from './actions'
import {Dispatch} from 'redux'
import {actionType} from './action-types'
import axios from 'axios';

export const userToHomePage = () => {
    return (dispatch: Dispatch<Action>) => ({
        type: actionType.HOMEPAGE
    })
}

export const userToBreedsPage = () => {
    return (dispatch: Dispatch<Action>) => ({
        type: actionType.BREEDS,
    })
}

export const userClickedBreed = () => {
    return (dispatch: Dispatch<Action>) => ({
        type: actionType.HOMEPAGE
    })
}

export const getDogsToHomePage = () => {
    return (dispatch: Promise<void>) => (
        axios.get('breeds/image/random/50')
             .then(response =>{
                const dogs:string[] = response.data;
                console.log(dogs);
           }).catch(error => {
               const errMsg = error.message;
        })
    )
}