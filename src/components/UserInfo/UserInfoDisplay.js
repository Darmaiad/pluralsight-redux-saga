import React from 'react';
import PropTypes from 'prop-types';

export const UserInfoDisplay = ({ name, address1, country, phone, fetched }) => (
    <div>
        <section className="current-user">
            {fetched ?
                <p>
                    {name}
                    <br />
                    {address1}, {country}
                    <br />
                    {phone}
                </p>
                :
                <div>
                    <p>
                        Please wait while we fetch your user info.
                    </p>
                </div>}
        </section>
    </div>
);

UserInfoDisplay.propTypes = {
    name: PropTypes.string,
    address1: PropTypes.string,
    country: PropTypes.string,
    phone: PropTypes.string,
    fetched: PropTypes.bool,
};
