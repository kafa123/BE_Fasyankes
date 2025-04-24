import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1741821588080 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE "users" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(50) NOT NULL,
            "email" varchar(50) NOT NULL,
            "password" varchar(200) NOT NULL,
            "profesion" varchar(50) NULL,
            "institute" varchar(50) NULL,
            "phone_number" varchar(50) NULL,
            "role" varchar(20) NOT NULL DEFAULT 'user',
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
          )
        `);
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE "users"`);
    }

}
