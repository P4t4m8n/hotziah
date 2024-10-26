"use client";

import { TTaxonomyName } from "@/service/models/taxonomy.model";
import { ITherapistFilter } from "@/service/models/therapists.model";
import { Gender, TherapistStatus } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

interface Props {
  taxonomies: Record<TTaxonomyName, string[]>;
}

export default function TherapistFilterClient({ taxonomies }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { subjects, languages, meetingTypes, education } = taxonomies;

  const filter: ITherapistFilter = {
    firstName: searchParams.get("firstName") || undefined,
    lastName: searchParams.get("lastName") || undefined,
    page: searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1,
    take: searchParams.get("take") ? parseInt(searchParams.get("take")!) : 10,
    status: (searchParams.get("status") as TherapistStatus) || "PENDING",
    subjects: searchParams.getAll("subjects"),
    languages: searchParams.getAll("languages"),
    meetingType: searchParams.getAll("meetingType"),
    gender: (searchParams.get("gender") as Gender) || "MAN",
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
      if (value) {
        params.append(key, value.toString());
      }
    });

    router.push(`/admin/therapist?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block">
          First Name:
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          defaultValue={filter.firstName}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block">
          Last Name:
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          defaultValue={filter.lastName}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="status" className="block">
          Status:
        </label>
        <select
          name="status"
          id="status"
          defaultValue={filter.status}
          className="w-full p-2 border rounded"
        >
          {Object.values(TherapistStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="subjects" className="block">
          Subjects:
        </label>
        <select
          name="subjects"
          id="subjects"
          multiple
          defaultValue={filter.subjects}
          className="w-full p-2 border rounded"
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="languages" className="block">
          Languages:
        </label>
        <select
          name="languages"
          id="languages"
          multiple
          defaultValue={filter.languages}
          className="w-full p-2 border rounded"
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="meetingType" className="block">
          Meeting Type:
        </label>
        <select
          name="meetingType"
          id="meetingType"
          multiple
          defaultValue={filter.meetingType}
          className="w-full p-2 border rounded"
        >
          {meetingTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="gender" className="block">
          Gender:
        </label>
        <select
          name="gender"
          id="gender"
          defaultValue={filter.gender}
          className="w-full p-2 border rounded"
        >
          {Object.values(Gender).map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 rounded"
      >
        Apply Filters
      </button>
    </form>
  );
}
