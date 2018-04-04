import express from 'express';

import CartController from './../controllers/CartController';

let cartRouter = express.Router();
cartRouter.get("/add/:owner/:itemID", CartController.cartAdjustmentMiddleware(true));
cartRouter.get("/remove/:owner/:itemID", CartController.cartAdjustmentMiddleware(false));
cartRouter.use(["/validate/:owner", "/:owner"], CartController.ownerMiddleware);
cartRouter.get("/validate/:owner", CartController.validateByOwner);
cartRouter.get("/:owner", CartController.getCartOwner);

export default cartRouter;
