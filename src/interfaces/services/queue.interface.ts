export type EQueueStatus =
  | "CLAIMED"
  | "CALLED"
  | "SERVED"
  | "SKIPPED"
  | "RELEASED"
  | "RESET";

export interface ICurrentQueuesResponse {
  id: number;
  isActive: boolean;
  name: string;
  currentQueue: number;
  status: EQueueStatus;
}

export interface IQueue {
  id: number;
  queueNumber: number;
  status: EQueueStatus;
  counter?: {
    id: number;
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface IClaimQueueResponse {
  queueNumber: number;
  counterName: string;
  counterId: number;
  estimatedWaitTime: number;
  positionInQueue: number;
}

export interface IGetQueueMetricsResponse {
  waiting: number;
  called: number;
  released: number;
  skipped: number;
}

export interface IReleaseQueueRequest {
  queueNumber: number;  // Ubah dari queue_number
  counterId: number;    // Ubah dari counter_id
}

export interface ICurrentQueuesResponse {
  id: number;
  isActive: boolean;
  name: string;
  currentQueue: number;
  status: EQueueStatus;
}

export interface INextQueueRequest {
  counterId: number;    // Ubah dari counter_id
}

export interface INextQueueResponse {
  queue: IQueue;
  previousQueue?: IQueue | null;
}

export interface ISkipQueueRequest {
  counterId: number;    // Ubah dari counter_id
}

export interface ISkipQueueResponse {
  skippedQueue: IQueue;
  nextQueue?: IQueue | null;
}

export interface IResetQueuesRequest {
  counterId?: number;   // Ubah dari counter_id
}

export interface IResetQueuesResponse {
  affectedQueues: number;
}
