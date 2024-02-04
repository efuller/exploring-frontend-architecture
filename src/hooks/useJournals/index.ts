import { useState } from "react";
import axios, { AxiosResponse } from "axios";

import { Journal } from "../../modules/food/journal.ts";

export const useJournals = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [pendingDelete, setPendingDelete] = useState('');

  const createJournal = async (newJournal: Journal) => {
    const result: AxiosResponse<Journal> = await axios.post('/journals', newJournal)

    if (result.status === 201) {
      setJournals((prevState) => {
        return [...prevState, result.data];
      });
    }

    return result;
  }

  const deleteJournal = async (id: string) => {
    const result: AxiosResponse<Journal> = await axios.delete(`/journals/${id}`)

    if (result.status === 200) {
      const removeDeletedJournal = journals.filter((journal) => journal.id !== result.data.id);

      setJournals(() => {
        return [...removeDeletedJournal];
      });
    }

    return result;
  }

  const exists = (id: string) => {
    const items = journals.filter((journal) => journal.id === id);

    return !!items.length;
  }

  return {
    createJournal: createJournal,
    deleteJournal: deleteJournal,
    exists,
    pendingDelete,
    journals,
    setPendingDelete,
    setJournals
  }
}