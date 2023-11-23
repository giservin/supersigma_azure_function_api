// const MeetingActivity = require('../models/MeetingActivity');
const SuperNotificationQueue = require('../config/SuperNotificationQueue');

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const username = request.query.get("username");
    // const method = request.query.get("method");
    const notificationRecipient = new SuperNotificationQueue(`https://rgsuperappa6e1.queue.core.windows.net/`);
    const queueName = username.replace(/[^a-zA-Z0-9]/g,'');
    try {
        if(await notificationRecipient.exist(queueName) == false) {
            return {
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify([])
            }
        }
        const messages = await notificationRecipient.receiveNotification(queueName);
        // context.log(messages);
        return {
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(messages)
        }
        // if(method == "add") {
        //     await notificationRecipient.addNotification(username, {meeting: "001",title: "meeting probis"});
        //     return {
        //         headers: { "Content-Type": "application/json"},
        //         body: JSON.stringify({notifAdded: true})
        //     }
        // }
        // if(method == "receive") {
        //     const messages = await notificationRecipient.receiveNotification(username);
        //     context.log(messages);
        //     return {
        //         headers: { "Content-Type": "application/json"},
        //         body: JSON.stringify(messages)
        //     }
        // }
    } catch (error) {
        context.log(`error in ${request.url} : ${error}`);
        return {
            headers: { "Content-Type": "application/json"},
            status: 500,
            body: JSON.stringify(error)
        }
    }
}