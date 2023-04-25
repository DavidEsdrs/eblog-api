import { DataSource } from "typeorm";
import { CreateUsersTable1682389045477 } from "./migrations/1682389045477-create_users_table";
import { User } from "./entities/User";
import { config } from "dotenv";

config({
    path: ".env.dev"
});

const AppDataSource = new DataSource({
    type: "mysql",
    url: process.env.DATABASE_URL,
    migrations: [
        CreateUsersTable1682389045477
    ],
    entities: [
        User
    ]
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

export default AppDataSource;