import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1757409505062 implements MigrationInterface {
    name = 'Auto1757409505062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "request" character varying NOT NULL, "frequency" integer NOT NULL, "region" character varying NOT NULL, "projectId" uuid, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_7cd83bcb2e7ee9e28b850d658da" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_7cd83bcb2e7ee9e28b850d658da"`);
        await queryRunner.query(`DROP TABLE "requests"`);
    }

}
