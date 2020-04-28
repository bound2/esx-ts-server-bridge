export class NotEnoughResourceError extends Error {

    private static readonly MESSAGE: string = "not-enough.resource";

    constructor() {
        super(NotEnoughResourceError.MESSAGE);
        Object.setPrototypeOf(this, NotEnoughResourceError.prototype);
    }
}