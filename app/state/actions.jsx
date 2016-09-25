function inline(modifies, apply) {
    return {
        type: 'INLINE_ACTION',
        modifies,
        apply
    };
}

export function makeFunny(v) {
    return dispatch => {
        console.log('lets go')
        dispatch(inline('funny', state => state.funny = v));
    } 
}
