import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePostsTable1682426203039 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "posts",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "title",
                    type: "varchar",
                    length: "100",
                    isNullable: false
                },
                {
                    name: "summary",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "content",
                    type: "longtext",
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
                },
                {
                    name: "creator",
                    type: "integer",
                    isNullable: false
                }
            ],
            foreignKeys: [
                {
                    name: "post_user_fk",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["creator"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("posts");
    }

}
