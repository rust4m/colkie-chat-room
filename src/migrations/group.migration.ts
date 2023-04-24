import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGroupTable implements MigrationInterface {
    name = `CreateGroupTable${new Date().getTime()}`;

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "group" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" character varying(20) UNIQUE NOT NULL, 
                "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now())`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('');
    }
}
