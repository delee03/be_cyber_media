import mysql2 from "mysql2";

const pool = mysql2
    .createPool({
        host: `localhost`,
        user: `root`,
        password: `123`,
        port: `3305`,
        database: `db_media`,

        // Lấy đúng thời gian đã lưu trong db
        timezone: `Z`,
    })
    .promise();

export default pool;
