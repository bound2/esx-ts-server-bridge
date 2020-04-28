import { required, size, validate } from 'fivem-ts-arg-validator';

export class NoSuchPlayerError extends Error {
    private static readonly MESSAGE: string = 'no-such.player';

    constructor() {
        super(NoSuchPlayerError.MESSAGE);
        Object.setPrototypeOf(this, NoSuchPlayerError.prototype);
    }
}

export class NotEnoughResourceError extends Error {
    private static readonly MESSAGE: string = 'not-enough.resource';

    constructor() {
        super(NotEnoughResourceError.MESSAGE);
        Object.setPrototypeOf(this, NotEnoughResourceError.prototype);
    }
}

export class EsxBridge {
    private readonly esx;

    constructor() {
        this.esx = exports.es_extended.getSharedObject();
    }

    @validate
    public async removeItem(@required playerId: string, @required itemName: string, @required @size(0, Number.MAX_VALUE) qty: number): Promise<void> {
        const player = this.esx.GetPlayerFromId(playerId);
        if (!player) {
            return Promise.reject(new NoSuchPlayerError());
        }

        const inventoryItem = player.getInventoryItem(itemName);
        if (inventoryItem.count < qty) {
            return Promise.reject(new NotEnoughResourceError());
        }

        player.removeInventoryItem(itemName, qty);
    }

    @validate
    public async addItem(@required playerId: string, @required itemName: string, @required @size(0, Number.MAX_VALUE) qty: number): Promise<void> {
        const player = this.esx.GetPlayerFromId(playerId);
        if (!player) {
            return Promise.reject(new NoSuchPlayerError());
        }

        player.addInventoryItem(itemName, qty);
    }

    @validate
    public async addCash(@required playerId: string, @required @size(0, Number.MAX_VALUE) qty: number): Promise<void> {
        const player = this.esx.GetPlayerFromId(playerId);
        if (!player) {
            return Promise.reject(new NoSuchPlayerError());
        }

        player.addMoney(qty);
    }

    @validate
    public async getUserId(@required playerId: string): Promise<string> {
        const player = this.esx.GetPlayerFromId(playerId);
        if (!player) {
            return Promise.reject(new NoSuchPlayerError());
        }

        return player.identifier;
    }

    @validate
    public async notifyClient(@required playerId: string, @required message: string): Promise<void> {
        TriggerClientEvent('esx:showNotification', playerId, message);
    }
}
