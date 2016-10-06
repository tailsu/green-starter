import horizonClient from '@horizon/client'
import * as actions from './actions'

let horizon = horizonClient({});

function promisesFromUpdates(promises, updates, collection, method) {
    if (!updates) {
        return;
    }

    promises.push(... updates.map(u => new Promise((resolve, reject) =>
        method.call(collection, u).subscribe(resolve, reject))));
}

export async function applyChanges(dispatch, getState) {
    let {updateQueue} = getState();
    let promises = [];

    dispatch(actions.clearUpdateQueue());

    Object.keys(updateQueue).forEach(updateKey => {
        let updates = updateQueue[updateKey];
        let collection = horizon(updateKey);
        promisesFromUpdates(promises, updates.add, collection, collection.store);
        promisesFromUpdates(promises, updates.update, collection, collection.update);
        promisesFromUpdates(promises, updates.delete, collection, collection.remove);
    });
    await Promise.all(promises);
}
