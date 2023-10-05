module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    try {
        const apiUrl = 'https://portal.telkom.co.id/windigital/api/portal/latest?limit=5';
        const response = await fetch(apiUrl);
        const data = await response.json();
     
        return { 
            headers: { "Content-Type": "application/json"},
            status: 200,
            body: JSON.stringify(data.data) 
        };
    } catch(error) {
        return {
            headers: { "Content-Type": "application/json"},
            status: 500,
            body: JSON.stringify({error: 'An error occurred'})
        }
    }

}