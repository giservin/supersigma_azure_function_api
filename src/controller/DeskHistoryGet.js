const History = require('../models/History');

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const userId = request.params.user_id;
  try{
    const HistoryUser = await History.findAll({
      where: {
        user: userId,
        category: "desk"
      }
    });
    return {
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(HistoryUser)
    }
  } catch (error) {
    context.log(`error in ${request.url} : ${error}`);
    return {
        headers: { "Content-Type": "application/json"},
        status: 500,
        body: JSON.stringify({error: 'An error occurred'})
    }
  }
}