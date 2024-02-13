import { ClientStorageRepository } from "../../modules/journal/clientStorageRepository.ts";
import { InMemoryClientStorage } from "../../modules/journal/infra/repos/inMemoryClientStorage.ts";
import { LocalStorageClient } from "../../modules/journal/infra/repos/localStorageClient.ts";
import { Journal } from "../../modules/journal/journal.ts";

describe('Client Storage Contract Test', () => {
  let repos: ClientStorageRepository[] = [];
  const journal = Journal.create({
    title: 'Take out the trash'
  });

  beforeEach(() => {
    repos = [
      new InMemoryClientStorage(),
      new LocalStorageClient(),
    ];
  });

  it('Can save a journal entry', async () => {
    for (const repo of repos) {
      await repo.add(journal);
      const entries = await repo.getAll();
      expect(entries[0].title).toEqual('Take out the trash');
      expect(entries[0].id).toEqual(journal.getId());
    }
  });

  it('Can delete a journal entry', async () => {
    for (const repo of repos) {
      await repo.add(journal);
      const entries = await repo.getAll();
      expect(entries[0].title).toEqual('Take out the trash');
      expect(entries[0].id).toEqual(journal.getId());

      await repo.delete(journal.getId());
      const newEntries = await repo.getAll();
      expect(newEntries.length).toBe(0);
    }
  })
});