import loki from 'lokijs';
const db = new loki('./database/deals.json',
    {
        persistenceMethod: "fs",
        autosave: true,
        autosaveInterval: 5000,
    })

export default db;