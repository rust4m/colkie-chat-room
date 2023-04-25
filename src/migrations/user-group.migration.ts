import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserGroupTable implements MigrationInterface {
    name = `CreateUserGroupTable${new Date().getTime()}`;

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "user_group" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL, 
                "group_id" uuid NOT NULL,
                UNIQUE (user_id, group_id));
            `,
        );

        await queryRunner.query(
            `DO $$
                BEGIN

                BEGIN
                    ALTER TABLE "user_group" ADD CONSTRAINT "group_to_user_group_fk1" FOREIGN KEY ("group_id") REFERENCES "group"("id");
                EXCEPTION
                    WHEN duplicate_object THEN RAISE NOTICE 'group_to_user_group_fk1 constraint already exists';
                END;

            END $$;
            
            
            DO $$
                BEGIN

                BEGIN
                    ALTER TABLE "user_group" ADD CONSTRAINT "user_to_user_group_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");
                EXCEPTION
                    WHEN duplicate_object THEN RAISE NOTICE 'user_to_user_group_fk1 constraint already exists';
                END;

            END $$;`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('');
    }
}
