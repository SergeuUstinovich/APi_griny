import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1757410738667 implements MigrationInterface {
    name = 'Auto1757410738667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" ADD "test" character varying NOT NULL`);
    }

}
