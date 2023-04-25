const { stopMongoMemoryServer } = require("./mongo-db-memory");

module.exports = async () => {
 console.log('Start globalTeardown');
 await stopMongoMemoryServer();
 console.log('MongoDB was stop');
};