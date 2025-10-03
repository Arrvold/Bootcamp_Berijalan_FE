"use server";

import { satellite } from "@/config/api.config";
import { APIBaseResponse } from "@/interfaces/api.interface";
import {
  ICounter,
  ICreateCounterRequest,
  IUpdateCounterRequest,
} from "@/interfaces/services/counter.interface";
import { errorMessage } from "@/utils/error.util";

const API_BASE_PATH = "/counters"; // Menggunakan base /api/v1/counters dari backend

export const apiGetAllCounters = async () => {
  try {
    const res = await satellite.get<APIBaseResponse<ICounter[]>>(
      `${API_BASE_PATH}`
    );
    return res.data;
  } catch (error) {
    return errorMessage<ICounter[]>(error);
  }
};

export const apiCreateCounter = async (data: ICreateCounterRequest) => {
  try {
    const res = await satellite.post<APIBaseResponse<ICounter>>(
      `${API_BASE_PATH}`,
      data
    );
    return res.data;
  } catch (error) {
    return errorMessage<ICounter>(error);
  }
};

export const apiUpdateCounter = async (data: IUpdateCounterRequest) => {
  try {
    const id = data.id;
    delete data.id; // Hapus id dari body karena akan dikirim via URL
    const res = await satellite.put<APIBaseResponse<ICounter>>(
      `${API_BASE_PATH}/${id}`,
      data
    );
    return res.data;
  } catch (error) {
    return errorMessage<ICounter>(error);
  }
};

export const apiDeleteCounter = async (id: number) => {
  try {
    const res = await satellite.delete<APIBaseResponse<null>>(
      `${API_BASE_PATH}/${id}`
    );
    return res.data;
  } catch (error) {
    return errorMessage<null>(error);
  }
};