import { MigrationInterface, QueryRunner } from "typeorm";

export class Books1698988971227 implements MigrationInterface {
    name = 'Books1698988971227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(128) NOT NULL, "description" text NOT NULL, "createdOn" datetime NOT NULL DEFAULT (datetime('now')), "updatedOn" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
