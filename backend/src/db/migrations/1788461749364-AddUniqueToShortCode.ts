import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueToShortCode1788461749364 implements MigrationInterface {
    name = 'AddUniqueToShortCode1788461749364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "url" ADD CONSTRAINT "UQ_b9ada929131b184dcf4ce79cf1a" UNIQUE ("url")`);
        await queryRunner.query(`ALTER TABLE "url" ADD CONSTRAINT "UQ_753a5cf9fa024dba92955b08553" UNIQUE ("short_code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "url" DROP CONSTRAINT "UQ_753a5cf9fa024dba92955b08553"`);
        await queryRunner.query(`ALTER TABLE "url" DROP CONSTRAINT "UQ_b9ada929131b184dcf4ce79cf1a"`);
    }

}
