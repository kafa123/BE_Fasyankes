import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCounts1742273135115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_counts" (
              "id" SERIAL PRIMARY KEY,
              "user_id" INTEGER NOT NULL,
              "login_date" date NOT NULL
            )
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE "user_counts"`);
    }

}
