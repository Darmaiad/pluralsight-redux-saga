import express from 'express';

import CardController from './../controllers/CardController';

export let card = express.Router();
card.use(["/validate/:owner", "/charge/:owner"], CardController.ownerMiddleware);
card.get("/validate/:owner", CardController.validateOwner);
card.get("/charge/:owner", CardController.chargeOwner);
