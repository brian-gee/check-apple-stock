const dotenv = require('dotenv');
const fetch = require('node-fetch');
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.FROM_NUMBER;
const toNumber = process.env.TO_NUMBER;
const client = require('twilio')(accountSid, authToken)

const phones = ['MPXT3LL/A','MQ0N3LL/A']

sendSMS = (number, product) => {
  client.messages
  .create({
     body: (product + ' is available!'),
     from: fromNumber,
     to: number
   })
  .then(message => console.log(message.sid));
};

checkPhone = (part) => {
    const url = 'https://www.apple.com/shop/fulfillment-messages?parts.0=' + part + '&store=R087'
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const productName = data.body.content.pickupMessage.stores[0].partsAvailability[part].messageTypes.regular.storePickupProductTitle;
        const productAvailable = data.body.content.pickupMessage.stores[0].partsAvailability[part].pickupDisplay;

        let status;
        if (productAvailable === "available")  {
            status = '✔️';
            sendSMS(productName);
        };
        if (productAvailable === "unavailable") {
            status = '✖️';
        };
        console.log(productName+ " - " + status);
    });
};


phones.forEach(checkPhone);
