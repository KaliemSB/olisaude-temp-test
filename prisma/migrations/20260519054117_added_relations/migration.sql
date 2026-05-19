-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clients_health_problems" (
    "clientId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,

    PRIMARY KEY ("clientId", "problemId"),
    CONSTRAINT "clients_health_problems_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "clients_health_problems_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "health_problems" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_clients_health_problems" ("clientId", "problemId") SELECT "clientId", "problemId" FROM "clients_health_problems";
DROP TABLE "clients_health_problems";
ALTER TABLE "new_clients_health_problems" RENAME TO "clients_health_problems";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
