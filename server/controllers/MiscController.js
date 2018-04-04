const database = require('./../database/getDatabase').database;

const MiscController = {
    getUserById(req, res) {
        const id = req.params.id;
        const user = database.users.find((user) => user.id === id);
        if (!user) {
            return res
                .status(500)
                .json({
                    error: "No user with the specified ID",
                    id,
                });
        } else {
            res
                .status(200)
                .json(user);
        }
    },

    getItemsById(req, res) {
        const ids = req.params.ids.split(',');
        const items = ids.map((id) => database.items.find((item) => item.id === id));
        if (items.includes(undefined)) {
            res
                .status(500)
                .json({ error: "A specified ID had no matching item" });
        } else {
            res
                .status(200)
                .json(items);
        }
    },

    getPricesByIdAndCurrency(req, res) {
        const ids = req.params.ids.split(',');
        const items = ids.map((id) => database.items.find((item) => item.id === id));
        const supportedSymbols = ["CAD", "USD"];
        const symbol = req.params.symbol;
        if (!supportedSymbols.includes(symbol)) {
            return res
                .status(403)
                .json({
                    error: "The currency symbol provided is inaccurate, see list of supported currencies",
                    supportedSymbols,
                });
        }

        if (items.includes(undefined)) {
            return res
                .status(500)
                .json({ error: "A specified ID had no matching item" });
        } else {
            res
                .status(200)
                .json(items.map((item) => ({
                    id: item.id,
                    symbol,
                    price: symbol === "USD" ? item.usd : item.cad,
                })));
        }
    },

    getShippingCost(req, res) {
        const ids = req.params.items.split(',');
        let total = 0;
        ids.forEach((id) => {
            const item = database.items.find((item) => item.id === id);
            if (item.weight === 0) {
                total += 0;
            } else if (item.weight < 0.5) {
                total += 3.5;
            } else {
                total += 8.5;
            }
        });
        res
            .status(200)
            .json({
                total,
            });
    },

    getTaxByCurrency(req, res) {
        const { symbol } = req.params;
        const taxRate = database.taxRates.find((rate) => rate.symbol === symbol);
        if (!taxRate) {
            return res
                .status(500)
                .json({
                    symbol,
                    error: "No tax rate info for symbol " + symbol,
                });
        }
        res
            .status(200)
            .json({
                rate: taxRate.rate,
            });
    },
};

export default MiscController;
