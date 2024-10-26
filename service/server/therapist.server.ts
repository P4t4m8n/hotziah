"use server";
import { Gender } from "@prisma/client";
import {
  IAddressDto,
  ITherapist,
  ITherapistDto,
  ITherapistFilter,
} from "../models/therapists.model";
import { therapistService } from "../service/therapist.service";
import { handleError } from "./util/error.util";
import { prisma } from "@/prisma/prismaClient";
import { redirect } from "next/navigation";
import {
  sanitizeAddressForm,
  sanitizeTherapistForm,
} from "./util/sanitization.util";
import { validateTherapistDto } from "../validations/therapist.validation";
import { validateAddressDto } from "../validations/address.validation";

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
          where: { id: therapistDto.id || undefined },
          update: { ...therapistDto, address: { update: addressDto } },
          create: { ...therapistDto, address: { create: addressDto } },
          select: therapistService.buildSql(),
        });
      }
    );
    console.log("therapist:", therapist);

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
 * Retrieves therapists based on the provided filter criteria.
 *
 * @param filter - The filter criteria to search for therapists.
 * @returns A promise that resolves to an object containing an array of therapists and the total count.
 * @throws If an error occurs during the retrieval process.
 */
export const getTherapists = async (
  filter: ITherapistFilter
): Promise<{ therapists: ITherapist[]; total: number }> => {
  try {
    const OR: {
      OR: {
        subjects?: { hasSome: string[] };
        languages?: { hasSome: string[] };
        meetingType?: { hasSome: string[] };
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

    // Get therapists and total count for pagination
    const [therapists, total] = await prisma.$transaction([
      prisma.therapist.findMany({
        where: where,
        select: therapistService.buildSql(),
        take: filter.take,
        skip: ((filter?.page || 1) - 1) * (filter?.take || 10),
      }),
      prisma.therapist.count({
        where: where,
      }),
    ]);

    return { therapists, total };
  } catch (error) {
    const err = handleError(error, "Error getting therapists");
    throw err;
  }
};
/**
 * Retrieves a therapist based on the provided user ID.
 *
 * @param userId - The ID of the user associated with the therapist.
 * @returns A Promise that resolves to the therapist object.
 * @throws Error if there is an issue retrieving the therapist.
 */
export const getTherapistByUserId = async (
  userId: string
): Promise<ITherapist> => {
  try {
    const therapist = await prisma.therapist.findUniqueOrThrow({
      where: { userId },
      select: therapistService.buildSql(),
    });
    return therapist;
  } catch (error) {
    const err = handleError(error, "Error getting therapist by userId");
    throw err;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveTherapistForm = async (state: any, formData: FormData) => {
  let therapist = undefined;
  try {
    const therapistDto = sanitizeTherapistForm(formData);
    console.log("therapistDto:", therapistDto)
    const addressDto = sanitizeAddressForm(formData);

    const therapistError = validateTherapistDto(therapistDto);
    if (therapistError.length) {
      const err = handleError(
        therapistError.join("\n"),
        "Error validating therapist data"
      );
      throw err;
    }

    const addressErrors = validateAddressDto(addressDto);
    if (addressErrors.length) {
      const err = handleError(
        addressErrors.join("\n"),
        "Error validating address data"
      );
      throw err;
    }
    console.log("therapistDto:", therapistDto);

    therapist = await saveTherapist(therapistDto as ITherapistDto, addressDto);
  } catch (error) {
    const err = handleError(error, "Error saving therapist form");
    throw err;
  } finally {
    if (therapist) {
      redirect(`/therapist/${therapist.id}`);
    }
  }
};
