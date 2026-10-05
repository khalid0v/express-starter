import db from "../libs/drizzle.config";


async function testDrizzleEndpoint() {
    // 
    return db.execute("SELECT 1 as result");
}


export default testDrizzleEndpoint;