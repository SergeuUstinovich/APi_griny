import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1775564607833 implements MigrationInterface {
    name = 'Auto1775564607833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chains" ADD "main_domain" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chains" DROP COLUMN "main_domain"`);
    }

}
