-- AlterTable
ALTER TABLE "ScheduledDemo" ALTER COLUMN "template" DROP NOT NULL,
ALTER COLUMN "template" SET DEFAULT E'General Purpose Chatbot';
