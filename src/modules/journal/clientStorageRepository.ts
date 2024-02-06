import { Journal } from "./journal.ts";

export interface ClientStorageRepository {
  add: (journal: Journal) => Promise<void>;
  delete: (id: string) => Promise<void>;
  getAll: () => Promise<Journal[]>;
}