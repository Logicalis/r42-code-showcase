'use strict';

const stdio = require('stdio');
const nodemailer = require('nodemailer');
const MailService = require('./lib/services/MailService');

const transporter = nodemailer.createTransport('smtps://joquinha12345678@gmail.com:asd12345678@smtp.gmail.com');

const myMailService = new MailService(transporter);

stdio.question('Qual o e-mail do destinatário?', (err, to) => {
    stdio.question('Qual o assunto do e-mail?', (err, subject) => {
        stdio.question('Qual o conteúdo da mensagem? (HTML)', (err, html) => {
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
