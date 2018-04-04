// es6 import, imports immutable bindings, meaning we could not modify the database object.
// By using commonJS (node.js) the imported value can be changed.
const database = require('./../database/getDatabase').database;

const CartController = {
  validateByOwner(req, res) {
    const { items } = req.cart;
    let validated = true;
    let error = null;
    items.forEach(({ id, quantity }) => {
      const item = database.items.find((item) => item.id === id);
      if (item.quantityAvailable < quantity) {
        validated = false;
        error = "There is an insufficient quantity of " + id;
      }
    });
    res
      .status(200)
      .json({ validated, error });
  },

  getCartOwner(req, res) {
    const cart = req.cart;
    res
      .status(200)
      .json(cart);
  },

  ownerMiddleware(req, res, next) {
    const { owner } = req.params;
    const cart = database.carts.find((cart) => cart.owner === owner);
    if (!cart) {
      return res
        .status(404)
        .json({ error: "No cart with the specified owner", owner });
    } else {
      req.cart = cart;
      next();
    }
  },

  cartAdjustmentMiddleware(shouldAdd = true) {
    return (req, res) => {
      const { owner, itemID } = req.params;
      const cart = database.carts.find((cart) => cart.owner === owner);
      if (!cart) {
        return res
          .status(500)
          .json({
            error: "No cart found with the specified ID",
            owner,
          });
      }

      const item = database.items.find((item) => item.id === itemID);
      if (!item) {
        return res
          .status(500)
          .json({
            error: "No item found with the specified ID",
            itemID,
          });
      }

      const existingItem = cart.items.find((cartItem) => cartItem.id === itemID);
      if (existingItem) {
        if (shouldAdd && parseInt(existingItem.quantity) >= parseInt(item.quantityAvailable)) {
          return res.status(503)
            .json({
              error: "An insufficient quantity of items remains.",
              itemID,
              quantityAvailable: item.quantityAvailable,
            });
        }
        existingItem.quantity += (shouldAdd ? 1 : -1);
        if (existingItem.quantity === 0) {
          cart.items = cart.items.filter((item) => item.id !== itemID);
        }
      } else {
        if (shouldAdd) {
          cart.items.push({
            quantity: 1,
            id: itemID,
          });
        } else {
          return res.status(500)
            .json({
              error: "No item with the specified ID exists in the cart to be removed",
              owner,
              itemID,
            });
        }
      }
      res
        .status(200)
        .send(cart);
    };
  },
};

export default CartController;
