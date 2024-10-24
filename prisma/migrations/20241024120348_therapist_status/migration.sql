-- CreateEnum
CREATE TYPE "TherapistStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'REJECTED');

-- AlterTable
ALTER TABLE "Therapist" ADD COLUMN     "status" "TherapistStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "subjects" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "languages" SET DEFAULT ARRAY[]::"Languages"[],
ALTER COLUMN "meetingType" SET DEFAULT ARRAY[]::"MeetingType"[],
ALTER COLUMN "gender" SET DEFAULT 'MAN',
ALTER COLUMN "phone" SET DEFAULT '',
ALTER COLUMN "education" SET DEFAULT ARRAY[]::"TherapistEducation"[];
