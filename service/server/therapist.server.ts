import { Gender, Languages, MeetingType } from "@prisma/client";
import {
  IAddressDto,
  ITherapist,
  ITherapistDto,
  ITherapistFilter,
} from "../models/therapists.model";
import { therapistService } from "../service/therapist.service";
import { handleError } from "./util/error.util";
import { prisma } from "@/prisma/prismaClient";
/**
 * Saves a therapist to the database.
 *
 * @param therapistDto The therapist data transfer object.
 * @param addressDto The address data transfer object.
 * @returns A promise that resolves to the saved therapist object.
 * @throws An error if there is an issue saving the therapist.
 */
export const saveTherapist = async (
  therapistDto: ITherapistDto,
  addressDto: IAddressDto
): Promise<ITherapist> => {
  try {
    const therapist: ITherapist = await prisma.$transaction(
      async (prismaClient) => {
        return prismaClient.therapist.upsert({
          where: { id: therapistDto.id },
          update: { ...therapistDto, address: { create: addressDto } },
          create: { ...therapistDto, address: { create: addressDto } },
          select: therapistService.buildSql(),
        });
      }
    );

    return therapist;
  } catch (error) {
    const err = handleError(error, "Error updating therapist");
    throw err;
  }
};
/**
 * Retrieves a therapist by their ID from the database.
 *
 * @param id - The ID of the therapist to retrieve.
 * @returns A Promise that resolves to the therapist object.
 * @throws Error if there is an issue retrieving the therapist.
 */
export const getTherapistById = async (id: string): Promise<ITherapist> => {
  try {
    const therapist: ITherapist = await prisma.therapist.findUniqueOrThrow({
      where: { id },
      select: therapistService.buildSql(),
    });
    return therapist;
  } catch (error) {
    const err = handleError(error, "Error getting therapist by id");
    throw err;
  }
};
/**
 * Removes a therapist from the database.
 *
 * @param id - The ID of the therapist to be removed.
 * @returns A boolean indicating whether the therapist was successfully removed.
 * @throws Error if there is an issue removing the therapist.
 */
export const removeTherapist = async (id: string): Promise<boolean> => {
  try {
    await prisma.therapist.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    const err = handleError(error, "Error removing therapist");
    throw err;
  }
};

/**
 * Retrieves all therapists from the database.
 *
 * @param filter - The filter object to apply to the query.
 * @returns A Promise that resolves to an array of therapist objects.
 * @throws Error if there is an issue retrieving the therapists.
 */
export const getTherapists = async (
  filter: ITherapistFilter
): Promise<ITherapist[]> => {
  try {
    const OR: {
      OR: {
        subjects?: { hasSome: string[] };
        languages?: { hasSome: Languages[] };
        meetingType?: { hasSome: MeetingType[] };
        user?: { firstName?: string; lastName?: string };
        address?: { city?: string };
        gender?: Gender;
      }[];
    } = { OR: [] };

    if (filter?.subjects?.length) {
      OR.OR.push({ subjects: { hasSome: filter.subjects } });
    }
    if (filter?.languages?.length) {
      OR.OR.push({ languages: { hasSome: filter.languages } });
    }
    if (filter?.meetingType?.length) {
      OR.OR.push({ meetingType: { hasSome: filter.meetingType } });
    }
    if (filter?.firstName) {
      OR.OR.push({ user: { firstName: filter.firstName } });
    }
    if (filter?.lastName) {
      OR.OR.push({ user: { lastName: filter.lastName } });
    }
    if (filter.city) {
      OR.OR.push({ address: { city: filter.city } });
    }
    if (filter.gender) {
      OR.OR.push({ gender: filter.gender });
    }

    const where = OR.OR.length > 0 ? { OR: OR.OR } : {};

  
    const therapists: ITherapist[] = await prisma.therapist.findMany({
      where: where,
      select: therapistService.buildSql(),
    });

    return therapists;
  } catch (error) {
    const err = handleError(error, "Error getting therapists");
    throw err;
  }
};
