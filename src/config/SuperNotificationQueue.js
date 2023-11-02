const { QueueServiceClient } = require("@azure/storage-queue");
const { DefaultAzureCredential } = require('@azure/identity');

const credential = new DefaultAzureCredential();

class SuperNotificationQueue extends QueueServiceClient {
    constructor(uri) {
        super(uri, credential);
    }
    
    addJsonConvert(queueObj) {
        const message = JSON.stringify(queueObj);
        return Buffer.from(message).toString('base64');
    }

    getJson(queueMsg) {
        const message = Buffer.from(queueMsg,'base64').toString();
        return JSON.parse(message);
    }

    async createNotificationUser(username) {
        const notifClient = this.getQueueClient(username);
        return await notifClient.createIfNotExists();
    }

    async exist(username) {
        const notifClient = this.getQueueClient(username);
        return await notifClient.exists();
    }

    async addNotification(username, detailsObj) {
        if(await this.exist(username)) {
            const notifClient = this.getQueueClient(username);
            const message = this.addJsonConvert(detailsObj);
            return await notifClient.sendMessage(message, {messageTimeToLive: 3600});
        }
        return { message: "users don't have notifs" };
    }

    async receiveNotification(username) {
        if(await this.exist(username)) {
            const notifClient = this.getQueueClient(username);
            const notifMsg = await notifClient.receiveMessages({numberOfMessages: 3})
            const notification = notifMsg.receivedMessageItems.map(message => {
                return this.getJson(message.messageText)
            })
            return notification;
        }
        return { message: "users don't have notifs" };
    }

}

module.exports = SuperNotificationQueue;