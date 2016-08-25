const MailService = require('../../lib/services/MailService');
const TranporterMock = require('./TranporterMock');

describe('MailService', () => {
    let mailService;

    beforeEach(function() {
        const transporterMock = new TranporterMock();
        mailService = new MailService(transporterMock);
    });

    it('should send a valid email', function (done) {
        const mail = {from: 'Mario', to: 'Princes'};

        mailService
            .send(mail)
            .then(() => {
                done();
            })
            .catch(() => {
                done.fail('Promise should be resolved.');
            });
    });

    it('should not send email without "from"', function (done) {
        const mail = {from: '', to: 'Princes'};

        mailService
            .send(mail)
            .then(() => {
                done.fail('Email sent without "from"');
            })
            .catch(() => {
                done();
            });
    });

    it('should not send email without "to"', function (done) {
        const mail = {from: 'Mario', to: ''};

        mailService

            .send(mail)
            .then(() => {
                done.fail('Email sent without "to"');
            })
            .catch(() => {
                done();
            });
    });
});
