import { useState } from "react";
import { JournalState } from "../../modules/journal/journalRepository.ts";

export const useJournals = () => {
  const [journals, setJournals] = useState<JournalState>({journals: [], pendingDeletion: null});

  return {
    journals,
    setJournals
  }
}