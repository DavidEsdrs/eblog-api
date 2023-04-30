import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1682389045477 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "username",
                    type: "varchar",
                    length: "20",
                    isNullable: false
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                    length: "100"
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "100"
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
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.dropTable("users");
    }

}
