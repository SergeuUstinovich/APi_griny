import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1764069575206 implements MigrationInterface {
    name = 'Auto1764069575206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "proxy_maks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "proxy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5e5dbd1e965b7ab76e80ea8a0d1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "proxy_maks"`);
    }

}
