import express from 'express';

import CardController from './../controllers/CardController';

let cardRouter = express.Router();
cardRouter.use(["/validate/:owner", "/charge/:owner"], CardController.ownerMiddleware);
cardRouter.get("/validate/:owner", CardController.validateOwner);
cardRouter.get("/charge/:owner", CardController.chargeOwner);

export default cardRouter;
