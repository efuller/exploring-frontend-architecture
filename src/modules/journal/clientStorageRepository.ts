import { Journal } from "./journal.ts";

export interface ClientStorageRepository {
  add: (foodId: Journal) => Promise<void>;
  delete: (id: string) => Promise<void>;
  getAll: () => Promise<Journal[]>;
}