import { JournalModel } from "../../models/journalModel.ts";

export const useFavorites = () => {
  const saveJournalToLocalStorage = (journal: JournalModel) => {
    const favorites = getFavoritesFromLocalStorage();

    const newFavorites = [
      ...favorites,
      journal
    ];

    localStorage.setItem('favoriteJournals', JSON.stringify(newFavorites));
  }

  const getFavoritesFromLocalStorage = () => {
    const favoritesFromLocalStorage = localStorage.getItem('favoriteJournals') || '';

    const favorites = favoritesFromLocalStorage ? JSON.parse(favoritesFromLocalStorage) : [];

    if (!Array.isArray(favorites || favorites.length < 1)) {
      return [];
    }

    return favorites;
  }

  const isFavorite = (id: string) => {
    const favorites = getFavoritesFromLocalStorage();

    const isFavorite = favorites.filter((favorite: JournalModel) => id === favorite.id);

    return !!isFavorite.length;
  }

  const deleteFavoriteFromLocalStorage = (id: string) => {
    const favoritesFromLocalStorage = localStorage.getItem('favoriteJournals') || '';

    const favorites = favoritesFromLocalStorage ? JSON.parse(favoritesFromLocalStorage) : [];

    if (!Array.isArray(favorites || favorites.length < 1)) {
      return false;
    }

    const filtered = favorites.filter((favorite: JournalModel) => id !== favorite.id);

    localStorage.setItem('favoriteJournals', JSON.stringify(filtered));
  }

  return {
    deleteFavoriteFromLocalStorage,
    isFavorite,
    saveJournalToLocalStorage,
  };
};