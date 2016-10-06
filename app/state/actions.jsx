import {applyChanges} from './horizon'

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

function pushChange(collectionName, changeCollectionName, item) {
    return async function (dispatch) {
        dispatch(inline(`updateQueue.${collectionName}`, state => {
            let updateQueue = state.updateQueue || (state.updateQueue = {});
            let collection = updateQueue[collectionName] || (updateQueue[collectionName] = {});
            let changeCollection = collection[changeCollectionName] || (collection[changeCollectionName] = []);
            changeCollection.push(_.cloneDeep(item));
        }));
        await dispatch(applyChanges);
    }
}

export function pushNew(collectionName, item) {
    return pushChange(collectionName, 'add', item);
}

export function pushUpdate(collectionName, item) {
    return pushChange(collectionName, 'update', item);
}

export function pushDelete(collectionName, item) {
    return pushChange(collectionName, 'delete', item);
}

export function clearUpdateQueue() {
    return inline('updateQueue', state => delete state.updateQueue);
}

export function setInline(name, value) {
    return inline(name, state => state[name] = value);
}