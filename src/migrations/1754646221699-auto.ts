import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1754646221699 implements MigrationInterface {
    name = 'Auto1754646221699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courier" DROP COLUMN "pid"`);
        await queryRunner.query(`ALTER TABLE "courier" DROP COLUMN "server"`);
        await queryRunner.query(`ALTER TABLE "courier" DROP COLUMN "region"`);
        await queryRunner.query(`ALTER TABLE "courier" ADD "request" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courier" DROP COLUMN "request"`);
        await queryRunner.query(`ALTER TABLE "courier" ADD "region" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courier" ADD "server" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courier" ADD "pid" integer NOT NULL`);
    }

}
