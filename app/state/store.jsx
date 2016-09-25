import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {connect} from 'react-redux'
import _ from 'lodash'
import * as actions from './actions'

function inlineAction(state = {}, action) {
    if (action.type === 'INLINE_ACTION') {
        state = _.extend({}, state);
        let modifies = _.isString(action.modifies) ? [action.modifies] : action.modifies;
        modifies.forEach(key => state[key] = _.cloneDeep(state[key]));
        action.apply(state);
    }
    return state;
}

export const store = createStore(inlineAction, applyMiddleware(thunk))

export default function _store(...args) {
    const mapper = args => {
        const mapState = state => {
            let excerpt = {};
            args.forEach(a => {
                let split = a.split('.');
                excerpt[split[split.length - 1]] = _.get(state, split);
            });
            return excerpt;
        }
        return f => connect(mapState, actions)(f);
    }
    return _.isFunction(args[0]) ? mapper([])(args[0]) : mapper(args);
}
