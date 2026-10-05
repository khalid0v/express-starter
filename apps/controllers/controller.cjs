const db = require("../libs/drizzle.config.cjs");


async function testDrizzleEndpoint() {
    // 
    return db.execute("SELECT 1 as result");
}


module.exports = testDrizzleEndpoint;