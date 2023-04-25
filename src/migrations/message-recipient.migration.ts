import { MigrationInterface, QueryRunner } from 'typeorm';

export class MessageRecipientTable implements MigrationInterface {
    name = `MessageRecipientTable${new Date().getTime()}`;

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "message_recipient" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_group_id" uuid NOT NULL, 
                "message_id" integer NOT NULL,
                UNIQUE (user_group_id, message_id));
            `,
        );

        await queryRunner.query(
            `DO $$
                BEGIN

                BEGIN
                    ALTER TABLE "message_recipient" ADD CONSTRAINT "user_group_to_message_recipient_fk1" FOREIGN KEY ("user_group_id") REFERENCES "user_group"("id");
                EXCEPTION
                    WHEN duplicate_object THEN RAISE NOTICE 'user_group_to_message_recipient constraint already exists';
                END;

            END $$;
            
            
            DO $$
                BEGIN

                BEGIN
                    ALTER TABLE "message_recipient" ADD CONSTRAINT "message_to_message_recipient_fk1" FOREIGN KEY ("message_id") REFERENCES "message"("id");
                EXCEPTION
                    WHEN duplicate_object THEN RAISE NOTICE 'message_to_message_recipient constraint already exists';
                END;

            END $$;`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('');
    }
}
