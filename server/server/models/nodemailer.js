const nodemailer = require('nodemailer');

var createTransportorter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'tproject575@gmail.com',
        pass:'123456789@m'
    }
});

export function sendEmail(mailoption) {

    createTransportorter.sendMail(mailoption , function(error ,info){
        if(error){
            console.log(error);

        }else {
            console.log('Email sent: ' + info.response)
        }
    });
}