
export function createReducer(defaultState, handlers) {
    if (typeof defaultState === 'object') {
        handlers = defaultState;
        defaultState = () => null;
    }

    const handlerMap = new Map();
    Object.keys(handlers).forEach((key) => {
        if (typeof key === 'function') {
            if (process.env.NODE_ENV !== 'production' && typeof key.type !== 'string') {
                throw new Error(`Invalid handler key: "${key.name}"`);
            }
            handlerMap.set(key.type, handlers[key]);
        } else {
            handlerMap.set(key, handlers[key]);
        }
    });

    return (state = defaultState(), action) => {
        if (action && handlerMap.has(action.type)) {
            return handlerMap.get(action.type)(state, action);
        }

        return state;
    };
}


export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function parseJSON(response) {
    return response.json()


}