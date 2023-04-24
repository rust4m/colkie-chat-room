import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable implements MigrationInterface {
    name = `CreateUserTable${new Date().getTime()}`;

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "user" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "full_name" character varying(20) UNIQUE NOT NULL, 
                "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now())`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('');
    }
}
