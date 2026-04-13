import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1775484818167 implements MigrationInterface {
    name = 'Auto1775484818167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "keywords" DROP CONSTRAINT "FK_8211f4ef0ef3da634297dbc419e"`);
        await queryRunner.query(`ALTER TABLE "keywords" ADD "domain_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "keywords" ADD CONSTRAINT "FK_f0c8b0e64cb80aa2d16d8236872" FOREIGN KEY ("domain_id") REFERENCES "domains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "keywords" DROP CONSTRAINT "FK_f0c8b0e64cb80aa2d16d8236872"`);
        await queryRunner.query(`ALTER TABLE "keywords" DROP COLUMN "domain_id"`);
        await queryRunner.query(`ALTER TABLE "keywords" ADD CONSTRAINT "FK_8211f4ef0ef3da634297dbc419e" FOREIGN KEY ("project_id") REFERENCES "domains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
