import React from 'react';
import PropTypes from 'prop-types';

import { CartManageViewContainer } from './../CartManageView';
import { CheckoutStatusViewContainer } from './../CheckoutStatusView';

export const MainDisplay = ({ isCheckingOut }) => (
    <div>
        {isCheckingOut ? <div>
            <CheckoutStatusViewContainer />
        </div> : <div>
                <CartManageViewContainer />
            </div>}

    </div>
);

MainDisplay.propTypes = {
    isCheckingOut: PropTypes.bool,
};
