import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import { JournalModel } from "../../models/journalModel.ts";

export const useJournals = () => {
  const [journals, setJournals] = useState<JournalModel[]>([]);
  const [pendingDelete, setPendingDelete] = useState('');

  const createJournal = async (newJournal: JournalModel) => {
    const result: AxiosResponse<JournalModel> = await axios.post('/journals', newJournal)

    if (result.status === 201) {
      setJournals((prevState) => {
        return [...prevState, result.data];
      });
    }

    return result;
  }

  const deleteJournal = async (id: string) => {
    const result: AxiosResponse<JournalModel> = await axios.delete(`/journals/${id}`)

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

  useEffect(() => {
    axios.get<JournalModel[]>('/journals')
      .then((data) => {
        setJournals(data.data);
      });
  }, []);

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