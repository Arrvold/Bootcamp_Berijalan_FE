export interface ICounter {
  id: number;
  name: string;
  currentQueue: number;
  maxQueue: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ICreateCounterRequest {
  name: string;
  maxQueue: number; // Ubah dari max_queue
  isActive: boolean; // Ubah dari is_active
}

export interface IUpdateCounterRequest extends ICreateCounterRequest {
  id?: number;
}

export interface ICounterResponse {
  id: number;
  name: string;
  currentQueue: number;
  maxQueue: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
