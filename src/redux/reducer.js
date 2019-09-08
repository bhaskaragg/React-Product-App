import { products} from '../products'
const initialState = {
    products : products,
    itemIndex : 0
}
export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_PRODUCT':
            {       
                    let index = action.payload.itemIndex;
                    let newItem = action.payload.editItem;
                    const productItems = [
                        ...state.products.slice(0, index),
                        newItem,
                        ...state.products.slice(index + 1)
                    ]
                    return {
                        ...state,
                        products : productItems
                    }
             }
        case 'SET_INDEX':
        {
            return {
                ...state,
                itemIndex : action.payload
            }
        }
        default:
            return state;
    }
};

