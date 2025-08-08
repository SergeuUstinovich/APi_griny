import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1754644255860 implements MigrationInterface {
    name = 'Auto1754644255860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courier" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pid" integer NOT NULL, "server" character varying NOT NULL, "region" character varying NOT NULL, CONSTRAINT "PK_94613ec7dc72f7dfa2d072a31cf" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "courier"`);
    }

}
