import React from 'react';
import LinkButton from './LinkButton';

export const StripeCustomers = () => {
    const STRIPE_URL = 'https://connect.stripe.com/oauth/authorize?redirect_uri=https://connect.stripe.com/hosted/oauth&client_id=ca_HQb2Q7GV9e3a0WblGu5CGQKDBpEKkyoG&state=onbrd_HRnFXdlCZzx2U6ZkeyyDCtYAUK&response_type=code&scope=read_write&stripe_user[country]=IN';

    return (
        <LinkButton to={STRIPE_URL}>
            Connect your Paypal I
        </LinkButton>
    );
};
