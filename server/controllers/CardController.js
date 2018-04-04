const database = require('./../database/getDatabase').database;

const CardController = {
    ownerMiddleware(req, res, next) {
        const { owner } = req.params;
        const cart = database.carts.find((cart) => cart.owner === owner);
        const card = database.cards.find((card) => card.owner === owner);
        if (!cart) {
            return res
                .status(404)
                .json({ error: "No cart with the specified owner", owner });
        }
        if (!card) {
            res.status(500).send({ error: `No card is available for user ${owner}` });
        }
        req.cart = cart;
        req.card = card;
        next();
    },

    validateOwner(req, res) {
        res
            .status(200)
            .json({ validated: true });
    },

    chargeOwner(req, res) {
        console.log(req.cart);
        const { card, cart } = req;
        const { owner } = req.params;
        const country = database.users.find((user) => user.id === owner).country;
        const total = cart.items.reduce((total, { quantity, id }) => {
            const item = database.items.find((item) => item.id === id);
            const symbol = country === "CAD" ? "cad" : "usd";
            const baseValue = item[symbol];
            total += baseValue * quantity;
            return total;
        }, 0);

        console.log('Available funds: ', card.availableFunds, '\nTotal amount:', total);

        if (card.availableFunds <= total) {
            return res
                .status(402)
                .json({ success: false });
        }

        card.availableFunds -= total;
        res
            .status(201)
            .send({ success: true });
    },
};

export default CardController;
