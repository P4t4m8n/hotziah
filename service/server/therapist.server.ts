import {
  IAddressDto,
  ITherapist,
  ITherapistDto,
} from "../models/therapists.model";
import { handleError } from "./util/error.util";
import { prisma } from "@/prisma/prismaClient";

export const createTherapist = async (
  therapistDto: ITherapistDto,
  addressDto: IAddressDto
): Promise<ITherapist> => {
  try {
    const therapist: ITherapist = await prisma.therapist.create({
      data: { ...therapistDto, address: { create: addressDto } },

      select: {
        id: true,
        subjects: true,
        languages: true,
        meetingType: true,
        address: {
          select: {
            id: true,
            city: true,
            street: true,
            isAccessible: true,
            number: true,
            zipCode: true,
            floor: true,
            entrance: true,
          },
        },
        gender: true,
        phone: true,
        education: true,
      },
    });

    return therapist;
  } catch (error) {
    const err = handleError(error, " Error in create Therapist server");
    throw err;
  }
};

export const getTherapistById = async (id: string): Promise<ITherapist> => {
  try {
    const therapist: ITherapist = await prisma.therapist.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        subjects: true,
        languages: true,
        meetingType: true,
        gender: true,
        phone: true,
        education: true,
        address: {
          select: {
            id: true,
            city: true,
            street: true,
            isAccessible: true,
            number: true,
            zipCode: true,
            floor: true,
            entrance: true,
          },
        },
      },
    });
    return therapist;
  } catch (error) {
    const err = handleError(error, "Error getting therapist by id");
    throw err;
  }
};
