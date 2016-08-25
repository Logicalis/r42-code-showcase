'use strict';

/**
 @name SendMailCallback
 @function
 @param {object} err - Error object if message failed.
 @param {object} info - Includes the result, the exact format depends on the transport mechanism used.
 @param {string} info.messageId - Most transports should return the final Message-Id value used with this property.
 @param {string} info.envelope - the envelope object for the message
 @param {Object[]} info.accepted - an array returned by SMTP transports (includes recipient addresses that were accepted by the server
 @param {Object[]} info.rejected - an array returned by SMTP transports (includes recipient addresses that were rejected by the server
 @param {Object[]} info.pending - an array returned by Direct SMTP transport. Includes recipient addresses that were temporarily rejected together with the server response
 @param {string} info.response - a string returned by SMTP transports and includes the last SMTP response from the server
 */

/**
 @name SendMailMethod
 @function
 @param {Email} email - Email object
 @param {SendMailCallback} callback - Callback when e-mail has been sent or when some error has occurred.
 */

/**
 @typedef {object} Email
 @property {string} from - Sender address.
 @property {string} to - List of receivers.
 @property {string} subject - Subject line.
 @property {string} text - Plaintext body.
 @property {string} html - Html body.
 /

/**
 @typedef {object} Transporter
 @property {SendMailMethod} sendMail - Send e-mail when executed and callback when its done.
 /

/**
 * Class representing a Mailing service.
 */

class MailService {
    /**
     * Create a MailService.
     * @param {Transporter} transporter - Transporter object. More info: https://github.com/nodemailer/nodemailer
     */
    constructor(transporter) {
        this.transporter = transporter;
    }

    send(mail) {
        return new Promise((resolve, reject) => {

            // validate email
            try {
                this.validate(mail);
            } catch (err) {
                reject(err);
            }

            // send email
            this.transporter.sendMail(mail, (err, info) => {
                if (err) {
                    return reject(err);
                }
                resolve(info);
            });

        });
    }

    validate(mail) {
        if (!mail) {
            throw new Error('Could not send mail due to: "mail" is undefined.');
        }
        if (!mail.from) {
            throw new Error('Could not send mail due to: "mail.from" is undefined.');
        }
        if (!mail.to) {
            throw new Error('Could not send mail due to: "mail.to" is undefined.');
        }
    }
}

module.exports = MailService;
