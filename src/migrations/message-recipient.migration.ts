// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class CreateMessageRecipientTable implements MigrationInterface {
//     name = `CreateMessageRecipientTable${new Date().getTime()}`;

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(
//             `CREATE TABLE IF NOT EXISTS "message" (
//                 "id" serial PRIMARY KEY,
//                 "content" character varying(100) NOT NULL,
//                 "subject" character varying(100) NOT NULL,
//                 "prev_message_id" INTEGER NULL,
//                 "user_id" uuid NOT NULL,
//                 "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now());`,
//         );

//         await queryRunner.query(
//             `DO $$
//                 BEGIN

//                 BEGIN
//                     ALTER TABLE "message" ADD CONSTRAINT "message_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");
//                 EXCEPTION
//                     WHEN duplicate_object THEN RAISE NOTICE 'message_fk1 constraint message_fk1 already exists';
//                 END;

//             END $$;`,
//         );
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query('drop table message');
//     }
// }
