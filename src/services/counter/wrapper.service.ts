"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiCreateCounter, apiGetAllCounters, apiUpdateCounter, apiDeleteCounter } from "./api.service.js";
import toast from "react-hot-toast";
import { ICreateCounterRequest, IUpdateCounterRequest } from "@/interfaces/services/counter.interface";

const COUNTER_KEYS = { all: ["counters"] as const };

export const useGetAllCounters = () => {
  return useQuery({
    queryKey: COUNTER_KEYS.all,
    queryFn: apiGetAllCounters,
  });
};

export const useCreateCounter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateCounterRequest) => apiCreateCounter(data),
    onSuccess: () => {
      toast.success("Counter created successfully");
      queryClient.invalidateQueries({ queryKey: COUNTER_KEYS.all });
    },
    onError: () => toast.error("Failed to create counter"),
  });
};

export const useUpdateCounter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: IUpdateCounterRequest) => apiUpdateCounter(data),
        onSuccess: () => {
            toast.success("Counter updated successfully");
            queryClient.invalidateQueries({ queryKey: COUNTER_KEYS.all });
        },
        onError: () => toast.error("Failed to update counter"),
    });
};

export const useDeleteCounter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => apiDeleteCounter(id),
        onSuccess: () => {
            toast.success("Counter deleted successfully");
            queryClient.invalidateQueries({ queryKey: COUNTER_KEYS.all });
        },
        onError: () => toast.error("Failed to delete counter"),
    });
};