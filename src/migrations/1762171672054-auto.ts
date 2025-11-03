import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1762171672054 implements MigrationInterface {
    name = 'Auto1762171672054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "proxy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "proxy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_581edf779fc90b8d2687c658276" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "proxy"`);
    }

}
