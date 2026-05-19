/*
  Warnings:

  - The primary key for the `clients_health_problems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clientId` on the `clients_health_problems` table. All the data in the column will be lost.
  - You are about to drop the column `problemId` on the `clients_health_problems` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `clients_health_problems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problem_id` to the `clients_health_problems` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clients_health_problems" (
    "client_id" TEXT NOT NULL,
    "problem_id" TEXT NOT NULL,

    PRIMARY KEY ("client_id", "problem_id"),
    CONSTRAINT "clients_health_problems_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "clients_health_problems_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "health_problems" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "clients_health_problems";
ALTER TABLE "new_clients_health_problems" RENAME TO "clients_health_problems";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
