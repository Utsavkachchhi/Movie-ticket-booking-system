import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

// create reusable transporter object using the default SMTP transport
const createTransport = () => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.nodeMailerUser,
            pass: process.env.nodeMailerPassword
        }
    });
    return transporter;
};

export const forgotPasswordMail = async (email: string, subject: string, data: string) => {
    return new Promise((resolve, reject) => {
        try {
            let html = path.resolve(import.meta.dirname, '..', 'template', 'forgotPassword.html');

            const source = fs.readFileSync(html, 'utf-8').toString();
            const template = handlebars.compile(source);
            const replacements = {
                forgetPasswordLink: data
            };

            const htmlToSend = template(replacements);
            let transporter = createTransport();
            let mailOptions = {
                from: process.env.nodeMailerUser, // sender address
                to: email, // list of receivers
                subject: subject,
                html: htmlToSend
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return reject({
                        msg: 'Email Sending Failed'
                    });
                }
                return resolve(true);
            });
        } catch (err) {
            reject(err);
        }
    });
};
