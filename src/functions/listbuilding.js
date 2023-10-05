const { app } = require('@azure/functions');
const BuildingList = require('../controller/BuildingList')

app.http('listbuilding', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'meetings/list_building',
    handler: BuildingList
});
