import {factory, primaryKey} from '@mswjs/data'
import { setupWorker } from "msw";
import { Journal } from "../modules/food/journal.ts";

export const db = factory({
  journals: {
    id: primaryKey(String),
    title: String,
  },
});

// Here, if we want to see upon reload
export function seedDb() {
  const favoritesFromLocalStorage = localStorage.getItem('favoriteJournals') || '';

  const favorites = favoritesFromLocalStorage ? JSON.parse(favoritesFromLocalStorage) : [];

  if (!Array.isArray(favorites || favorites.length < 1)) {
    return [];
  }

  favorites.forEach((favorite: Journal) => {
    return db.journals.create(favorite);
  });
}

export const handlers = [...db.journals.toHandlers('rest')];

// Establish requests interception.
export function setupBrowserMocks() {
  seedDb();
  setupWorker(...handlers).start();
}