export class NoSuchPlayerError extends Error {

    private static readonly MESSAGE: string = "no-such.player";

    constructor() {
        super(NoSuchPlayerError.MESSAGE);
        Object.setPrototypeOf(this, NoSuchPlayerError.prototype);
    }
}