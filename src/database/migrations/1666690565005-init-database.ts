import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDatabase1666690565005 implements MigrationInterface {
  name = 'initDatabase1666690565005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "users_role_enum" AS ENUM('SalaryHero', 'AdminCompany', 'Employee')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'Employee', "code" character varying NOT NULL, "salary" numeric(12,2), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "company_id" integer, CONSTRAINT "UQ_7e107146f8defa7286a86e37c95" UNIQUE ("code"), CONSTRAINT "REL_7ce411acb524c11f03fa38de9d" UNIQUE ("company_id"), CONSTRAINT "PK_9e5e2eb56e3837b43e5a547be23" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "companies" ("company_id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "UQ_80af3e6808151c3210b4d5a2185" UNIQUE ("code"), CONSTRAINT "REL_ee0839cba07cb0c52602021ad4" UNIQUE ("user_id"), CONSTRAINT "PK_8c008cd5c4c0c20cf1e77f68e8d" PRIMARY KEY ("company_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "requests" ("id" SERIAL NOT NULL, "amount" numeric(12,2), "status" BOOLEAN NOT NULL DEFAULT false , "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_ee0839cba07cb0c52602021ad5" UNIQUE ("user_id"), CONSTRAINT "PK_8c008cd5c4c0c20cf1e77f68e8c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "requests"`);
    await queryRunner.query(`DROP TABLE "companies"`);
    await queryRunner.query(`DROP TABLE "requests"`);
    await queryRunner.query(`DROP TYPE "requests_role_enum"`);
  }
}
