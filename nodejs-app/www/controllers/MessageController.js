import ActiveMqService from "../services/ActiveMqService.js";

class MessageController {
    constructor(activeMqService) {
        this.activeMqService = activeMqService
    }


    postMessage(req, res) {

        const message = JSON.stringify(req.body);

        this.activeMqService
            .postMessage(message,
                (error, responseMessage) => {

                    if (error) return res.status(500).json({ erreur: error.message });

                    const io = req.app.get("io");

                    const personne = JSON.parse(responseMessage);
                    personne.node = "OK";

                    io.emit("notify", personne);
                    res.status(200).end();
                }
            )








    }



}


export default new MessageController(ActiveMqService);