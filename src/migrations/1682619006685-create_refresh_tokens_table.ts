import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateRefreshTokensTable1682619006685 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "refresh_tokens",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "token",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "issuer",
                    type: "integer",
                    isNullable: false
                }
            ],
            foreignKeys: [
                {
                    name: "refresh_token_issuer_fk",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["issuer"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("refresh_tokens");
    }

}
