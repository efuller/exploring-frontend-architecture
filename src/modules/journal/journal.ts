import { IdGenerator } from "../../shared/idGenerator/idGenerator.ts";

export type JournalDTO = {
  id: string;
  title: string;
  isFavorite: boolean;
}

export type CreateJournalDTO = Pick<JournalDTO, "title"> & Partial<Pick<JournalDTO, "id" | "isFavorite">>;

export class Journal {
  private readonly id: string;
  private readonly title: string;
  private isFavorite: boolean;

  private constructor(journalProps: CreateJournalDTO) {
    this.id = journalProps.id || IdGenerator.generateId();
    this.title = journalProps.title;
    this.isFavorite = journalProps.isFavorite || false;
  }

  static create(journalProps: CreateJournalDTO) {
    return new Journal(journalProps);
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getIsFavorite() {
    return this.isFavorite;
  }

  setIsFavorite(isFavorite: boolean) {
    this.isFavorite = isFavorite;
  }

  toPersistence(): JournalDTO {
    return {
      id: this.id,
      title: this.title,
      isFavorite: this.isFavorite,
    }
  }
}
