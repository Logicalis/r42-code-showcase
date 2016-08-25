'use strict';

const stdio = require('stdio');
const nodemailer = require('nodemailer');
const MailService = require('./lib/services/MailService');

const transporter = nodemailer.createTransport('smtps://joquinha12345678@gmail.com:asd12345678@smtp.gmail.com');

const myMailService = new MailService(transporter);

stdio.question('E-mail do destinatário', (err, to) => {
    stdio.question('Assunto do e-mail', (err, subject) => {
        stdio.question('Conteúdo da e-mail (HTML)', (err, html) => {
            console.log('Enviando e-mail...');
            myMailService
                .send({
                    from: 'MailService Test',
                    to: to,
                    subject: subject,
                    html: html
                })
                .then(() => {
                    console.log('E-mail enviado com sucesso!');
                })
                .catch(error => {
                    console.log('Erro ao enviar o e-mail.');
                    console.log(error);
                });
        });
    });
});
