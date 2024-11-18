import ActiveMqService from "../services/ActiveMqService.js";

class MessageController {
    #activeMqService = null;
    constructor(activeMqService) {
        this.#activeMqService = activeMqService
    }


    postMessage(req, res) {

        this.#activeMqService.postMessage(req.body, (error, responseJsonString) => {
            if (error) return console.log('STOMPIT read message error ' + error.message);
            console.log("envoyé et reçu")
            // res.end(responseJsonString);
        })






    }



}


export default new MessageController(ActiveMqService);