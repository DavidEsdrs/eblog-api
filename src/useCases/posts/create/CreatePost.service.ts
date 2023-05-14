import { Repository } from "typeorm";
import { ICreatePostDTO } from "./CreatePost.dto";
import { User } from "../../../entities/User";
import { Post } from "../../../entities/Post";
import { PERSMISIONS } from "../../../configs/configs";
import { Roles } from "../../../entities/Role";

export class CreatePostService {
    constructor(
        private usersRepository: Repository<User>,
        private postsRepository: Repository<Post>
    ) {}

    async execute({ content, creator, summary, title, featured_image }: ICreatePostDTO) {
        const user = await this.usersRepository.findOne({ where: { id: creator } });
        if(!user) {
            throw new Error("User doesn't exist!");
        }
        if(!this.checkPermission(user)) {
            throw new Error("User doesn't have permision!");
        }
        const post = this.postsRepository.create({ content, creator: user, summary, title, featured_image });
        await this.postsRepository.save(post);
        return post;
    }

    private checkPermission(user: User): boolean {
        const roles = user.roles.map(role => role.type);
        for (let role of roles) {
            const permissions = this.getPermissionForRole(role);
            if(permissions.write) {
                return true;
            }
        }
        return false;
    }

    private getPermissionForRole(role: Roles) {
        const [roleKey, permissions] = Object.entries(PERSMISIONS).find(([roleKey, permissions]) => roleKey === role);
        return permissions;
    }
}