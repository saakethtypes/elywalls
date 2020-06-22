const {Stripe} = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCustomer = (email) =>
    {stripe
        .customers
        .create({ email })
        .then(({ id }) => id);}

exports.addCustomerCard = (stripeCustomerId, stripeToken) =>
    stripe
           .customers
           .createSource(stripeCustomerId, {
                source: stripeToken,
            });

exports.listCustomerCards = stripeCustomerId =>
stripe
    .customers
    .listCards(stripeCustomerId);