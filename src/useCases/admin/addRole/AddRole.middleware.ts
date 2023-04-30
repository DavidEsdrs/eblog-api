import z from "zod";
import { createBodyValidator } from "../../../utils/createValidator";

const bodySchema = z.object({
    role: z.
        enum(["root", "editor", "author", "reader"], {
            invalid_type_error: "The role must be either 'root', 'editor', 'author' or 'reader'"
        })
});

const addRoleBodyValidator = createBodyValidator(bodySchema);

const addRoleMiddlewares = [addRoleBodyValidator]

export { addRoleMiddlewares };