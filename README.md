# esx-ts-server-bridge
TypeScript helper library to perform common ESX server operations with input validation.

### Usage
Add dependency to your project with `yarn add esx-ts-server-bridge`.

### Code example
```typescript
import { EsxBridge, NoSuchPlayerError, NotEnoughResourceError } from 'esx-ts-server-bridge';
import { RequiredArgumentError, SizeConstraintError } from 'fivem-ts-arg-validator';

let esxBridge: EsxBridge;

interface TradeGoldCashApi {
    qty: number;
}

enum GameItem {
    GOLD = "gold"
}

onNet("ts-test:trade-gold-cash", async (request: TradeGoldCashApi): Promise<void> => {
    const playerId: string = source;

    esxBridge.removeItem(playerId, GameItem.GOLD, request.qty)
        .then(() => esxBridge.addCash(playerId, request.qty * 46))
        .then(() => esxBridge.notifyClient(playerId, "Trade successful"))
        .catch((err) => {
            if (err instanceof NoSuchPlayerError) {
                console.log(`${playerId} is not online`);
            } else if (err instanceof NotEnoughResourceError) {
                console.log(`${playerId} doesn't have enough resource to make the trade`);
                esxBridge.notifyClient(playerId, "Not enough resources!");
            } else if (err instanceof RequiredArgumentError) {
                esxBridge.notifyClient(playerId, "Invalid request");
            } else if (err instanceof SizeConstraintError) {
                esxBridge.notifyClient(playerId, `Invalid quantity: ${request.qty}`);
            } else {
                console.error(err.message, err.stack);
            }
        });
});

on("onResourceStart", async (resourceName: string): Promise<void> => {
    if (GetCurrentResourceName() !== resourceName) {
        return Promise.resolve();
    }

    esxBridge = new EsxBridge();
});

```