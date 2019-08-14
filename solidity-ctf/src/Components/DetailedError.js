class DetailedError extends Error {
    constructor(title, ...args) {
        super(...args);
        this.title = title;
        Error.captureStackTrace(this, DetailedError);
    }
}

export default DetailedError;