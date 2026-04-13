import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1775478788258 implements MigrationInterface {
    name = 'Auto1775478788258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chains" ("id" SERIAL NOT NULL, "chain_id" integer NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_cedff27e2bbff63f01d707239ba" UNIQUE ("chain_id"), CONSTRAINT "PK_f3c6ca7e7ad0f451e3b8f3dd378" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "domains" ("id" SERIAL NOT NULL, "chain_id" integer NOT NULL, "project_id" integer NOT NULL, "domain" character varying NOT NULL, "name" character varying NOT NULL, "task_type" character varying NOT NULL, "click_regions" json, "power" integer, "is_active" boolean NOT NULL DEFAULT true, "active_until" character varying, "order" integer, "task_link_id" integer, "pws" integer, "monthly_clicks" integer, "today_stats" json, "today_plan" json, "added_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_05a6b087662191c2ea7f7ddfc4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "domains" ADD CONSTRAINT "FK_ca1212a08c68016995176c82c74" FOREIGN KEY ("chain_id") REFERENCES "chains"("chain_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "domains" DROP CONSTRAINT "FK_ca1212a08c68016995176c82c74"`);
        await queryRunner.query(`DROP TABLE "domains"`);
        await queryRunner.query(`DROP TABLE "chains"`);
    }

}
