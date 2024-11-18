import stompit from "stompit"

class ActiveMqService {

    static connectOptions = {
        'host': 'localhost',
        'port': 61613,
        'connectHeaders': {
            'host': '/',
            'login': 'myuser',
            'passcode': 'mypwd',
            'heart-beat': '5000,5000'
        }
    };

    static sendHeaders = {
        'destination': 'fr.cpe.spring-app.in',
        'content-type': 'text/plain'
    };

    static subscribeHeaders = {
        'destination': 'fr.cpe.spring-app.in',
        'ack': 'client-individual'
    };

    constructor() { }

    postMessage(jsonString, callback) {
        stompit.connect(connectOptions, (error, client) => {

            if (error) return console.error('STOMPIT connect error ' + error.message);

            //EMIT
            const frame = client.send(sendHeaders);
            frame.write(jsonString);
            frame.end();

            //RECEIVE
            client.subscribe(subscribeHeaders, function (error, message) {

                if (error) {
                    console.log('STOMPIT subscribe error ' + error.message);
                    return;
                }

                message.readString('utf-8', callback);
            });



        })
    }




}


export default new ActiveMqService();