import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1775483177032 implements MigrationInterface {
    name = 'Auto1775483177032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "keywords" ("id" SERIAL NOT NULL, "keyword_id" integer NOT NULL, "project_id" integer NOT NULL, "kw" character varying NOT NULL, "target_page" character varying, "last_position" integer, "pws" integer, "is_active" boolean NOT NULL DEFAULT true, "monthly_clicks" integer, "fixed_clicks" integer, "lr" integer, "notfound_count" integer, "auto_boost_amount" integer, "auto_boost_period" integer, "scheduled_clicks" integer, "boosted_clicks" integer, "can_set_task_count" boolean, "today_stats" json, "added_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4aa660a7a585ed828da68f3c28e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "keywords" ADD CONSTRAINT "FK_8211f4ef0ef3da634297dbc419e" FOREIGN KEY ("project_id") REFERENCES "domains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "keywords" DROP CONSTRAINT "FK_8211f4ef0ef3da634297dbc419e"`);
        await queryRunner.query(`DROP TABLE "keywords"`);
    }

}
