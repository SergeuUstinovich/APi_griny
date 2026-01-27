import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1769504674402 implements MigrationInterface {
    name = 'Auto1769504674402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."proxy_maks_type_enum" AS ENUM('mobile', 'residential')`);
        await queryRunner.query(`ALTER TABLE "proxy_maks" ADD "type" "public"."proxy_maks_type_enum" NOT NULL DEFAULT 'residential'`);
        await queryRunner.query(`CREATE TYPE "public"."proxy_type_enum" AS ENUM('mobile', 'residential')`);
        await queryRunner.query(`ALTER TABLE "proxy" ADD "type" "public"."proxy_type_enum" NOT NULL DEFAULT 'residential'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proxy" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."proxy_type_enum"`);
        await queryRunner.query(`ALTER TABLE "proxy_maks" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."proxy_maks_type_enum"`);
    }

}
