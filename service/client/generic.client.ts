import { apiClientService } from "../util/apiClient.service";

const save = async <T extends { _id?: string }>(entity: T): Promise<T> => {
  if (entity._id) {
    return await _update(entity);
  }
  return await _create(entity);
};

const _create = async <T>(entity: T): Promise<T> => {
  return await apiClientService.post<T>("entities", entity);
};

const _update = async <T>(entity: T): Promise<T> => {
  return await apiClientService.put<T>("entities", entity);
};

export const entityClientService = {
  save,
};
