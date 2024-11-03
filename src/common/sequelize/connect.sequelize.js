import { Sequelize } from "sequelize";

const sequelize = new Sequelize(`db_media`, `root`, `123`, {
    host: `localhost`,
    port: `3305`,
    dialect: `mysql`,
    // logging: false
});

// Kiểm tra kết nối
sequelize
    .authenticate()
    .then(() => {
        console.log(`Kết nối db thành công`);
    })
    .catch((err) => {
        console.log(err);
        console.log(`Kết nối db không thành công`);
    });

export default sequelize;
