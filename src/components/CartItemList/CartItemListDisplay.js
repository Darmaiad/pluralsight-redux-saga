import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

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
    items: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
            id: PropTypes.string,
            quantity: PropTypes.number,
        })
    ),
    fetched: PropTypes.bool,
};

