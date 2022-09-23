let nodemailer = require('nodemailer');
let dotenv = require("dotenv");
const phones = ['MPXT3LL/A', 'MQ0N3LL/A']
dotenv.config();
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

sendEmail = (product) => {
    let emailList = ['brian86753099@gmail.com', 'nat_rez@icloud.com']
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS
        }
      });

      let mailOptions = {
        from: 'theonebot77@gmail.com',
        to: emailList,
        subject: 'iPhone Availability',
        text: ( product + ' is available!')
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
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
          sendEmail(productName)
        };
        if (productAvailable === "unavailable") {
            status = '✖️';
        };

        console.log(productName+ " - " + status);
    });
};


phones.forEach(checkPhone);