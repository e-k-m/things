function partial(fn, ...args) {
    return function (...rest) {
        return fn(...args, ...rest);
    };
}

export { partial };
