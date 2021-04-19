import { FAV_ADD_ITEM } from '../constants/favConstant'

export const favReducer = (state = {favItems: [] }, action) => {
    switch( action.type ) {
        case FAV_ADD_ITEM:
            const item = action.payload

            const existItem = state.favItems.find((x) => x.recipe === item.recipe)

            if (existItem) {
                return {
                    ...state, favItems: state.favItems.map((x) => x.recipe === existItem.recipe ? item : x)
                }
            } else {
                return {
                    ...state,
                    favItems: [...state.favItems, item]
                }
            }
        default:
            return state
    }
} 