import express from 'express';

import MiscController from './../controllers/MiscController';

let miscRouter = express.Router();
miscRouter.get("/user/:id", MiscController.getUserById);
miscRouter.get("/items/:ids", MiscController.getItemsById);
miscRouter.get("/prices/:symbol/:ids", MiscController.getPricesByIdAndCurrency);
miscRouter.get("/shipping/:items", MiscController.getShippingCost);
miscRouter.get("/tax/:symbol", MiscController.getTaxByCurrency);

export default miscRouter;
