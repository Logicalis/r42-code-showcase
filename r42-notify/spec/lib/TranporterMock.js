class TransporterMock {
    constructor() {

    }

    sendMail(mail, callback) {
        callback();
    }
}

module.exports = TransporterMock;
