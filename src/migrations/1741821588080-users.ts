import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1741821588080 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE "users" (
            "id" SERIAL PRIMARY KEY,
            "name" character varying NOT NULL,
            "email" character varying NOT NULL,
            "password" character varying NOT NULL,
            "role" character varying NOT NULL DEFAULT 'user',
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
          )
        `);
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
