import React from 'react';
import PropTypes from 'prop-types';

import { CartItemContainer } from '../CartItem';

export const CartItemListDisplay = ({ items, fetched }) => (
    <div>
        {fetched ? <div>
            {items.map((item) => (
                <CartItemContainer {...item.toJS()} key={item.get('id')} />
            ))}
        </div> :
            <div>
                Please wait...
        </div>
        }
    </div>
);

CartItemListDisplay.propTypes = {
    items: PropTypes.object,
    fetched: PropTypes.bool,
};

