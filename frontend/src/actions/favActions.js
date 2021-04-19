import axios from 'axios'
import { FAV_ADD_ITEM } from '../constants/favConstant'

export const addToFav = ( id ) => async ( dispatch, getState ) => {
    const { data } = await axios.get(`/api/recipes/${id}`)

    dispatch({
        type: FAV_ADD_ITEM,
        payload: {
            recipe: data._id,
            name: data.name,
            image: data.image
        }
    })

    localStorage.setItem('favItems', JSON.stringify(getState().fav.favItems))
}