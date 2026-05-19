-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birth_date" DATETIME NOT NULL,
    "sex" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "clients_health_problems" (
    "clientId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,

    PRIMARY KEY ("clientId", "problemId")
);

-- CreateTable
CREATE TABLE "health_problems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "severity" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_id_key" ON "clients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "health_problems_id_key" ON "health_problems"("id");
