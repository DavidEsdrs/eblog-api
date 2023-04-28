import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateRolesTable1682654836237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "roles",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "type",
                    type: "enum",
                    enum: ["root", "editor", "author", "reader"],
                    isNullable: false
                },
                {
                    name: "user",
                    type: "integer",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                    name: "roles_users_fk",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("roles");
    }

}
