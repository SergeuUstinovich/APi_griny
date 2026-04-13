import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1775566471833 implements MigrationInterface {
    name = 'Auto1775566471833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chains" ADD "last_domain" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chains" DROP COLUMN "last_domain"`);
    }

}
