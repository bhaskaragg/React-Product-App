export function editSelectedProduct(response) {
    return {
        type: 'EDIT_PRODUCT',
        payload: response
    };
}
export function setItemIndex(itemIndex) {
    return {
        type : 'SET_INDEX',
        payload : itemIndex
    }
}
