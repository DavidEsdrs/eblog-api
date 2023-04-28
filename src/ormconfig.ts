import { DataSource } from "typeorm";
import { CreateUsersTable1682389045477 } from "./migrations/1682389045477-create_users_table";
import { User } from "./entities/User";
import { config } from "dotenv";
import { CreatePostsTable1682426203039 } from "./migrations/1682426203039-create_posts_table";
import { Post } from "./entities/Post";
import { CreateRefreshTokensTable1682619006685 } from "./migrations/1682619006685-create_refresh_tokens_table";
import { RefreshToken } from "./entities/RefreshToken";

config({
    path: ".env.dev"
});

const AppDataSource = new DataSource({
    type: "mysql",
    url: process.env.DATABASE_URL,
    migrations: [
        CreateUsersTable1682389045477,
        CreatePostsTable1682426203039,
        CreateRefreshTokensTable1682619006685
    ],
    entities: [
        User,
        Post,
        RefreshToken
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