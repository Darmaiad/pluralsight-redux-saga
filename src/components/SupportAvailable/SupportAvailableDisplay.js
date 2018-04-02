import React from 'react';
import PropTypes from 'prop-types';

export const SupportAvailableDisplay = ({ isAvailable }) => (
    <div className="customer-service-message">
        {isAvailable ? <div>
            Customer service representatives are waiting to assist you.
    </div> : <div>
                Sorry, there's no one to assist you at this time.
    </div>}
    </div>
);

SupportAvailableDisplay.propTypes = {
    isAvailable: PropTypes.bool,
};
