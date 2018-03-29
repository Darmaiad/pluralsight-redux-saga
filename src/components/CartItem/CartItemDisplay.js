import React from 'react';
import PropTypes from 'prop-types';

import { FETCHED } from './../../actions';

export const CartItemDisplay = ({ fetched, name, description, price, id, quantity, increaseItemQuantity, decreaseItemQuantity, quantityFetchStatus }) => (
    <div>
        {fetched ?
            <div>
                <h5>
                    {name}
                </h5>
                <div>
                    {price ?
                        <div>${price}</div>
                        :
                        <div>
                            <div className="loader" title=" We're getting the price for this item..." />
                        </div>
                    }
                </div>
                <p>
                    {description}
                </p>
                <section>
                    <span className="item-quantity">
                        Quantity: {quantity}
                    </span>
                    <button className="btn btn-secondary" disabled={quantityFetchStatus !== FETCHED} onClick={() => decreaseItemQuantity(id)}>-</button>
                    <button className="btn btn-secondary" disabled={quantityFetchStatus !== FETCHED} onClick={() => increaseItemQuantity(id)}>+</button>
                </section>
            </div> : <div className="loader" />}
    </div>
);

CartItemDisplay.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
    quantity: PropTypes.number,
    increaseItemQuantity: PropTypes.func,
    decreaseItemQuantity: PropTypes.func,
    quantityFetchStatus: PropTypes.string,
    fetched: PropTypes.bool,
};
