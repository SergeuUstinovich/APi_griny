import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1757410668654 implements MigrationInterface {
    name = 'Auto1757410668654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" ADD "test" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "test"`);
    }

}
