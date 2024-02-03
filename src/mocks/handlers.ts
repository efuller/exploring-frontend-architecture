import {factory, primaryKey} from '@mswjs/data'
import { setupWorker } from "msw";
import { JournalModel } from "../models/journalModel.ts";

export const db = factory({
  foods: {
    id: primaryKey(String),
    title: String,
  },
});

// Here, if we want to see upon reload
export function seedDb() {
  const favoritesFromLocalStorage = localStorage.getItem('favoriteFoods') || '';

  const favorites = favoritesFromLocalStorage ? JSON.parse(favoritesFromLocalStorage) : [];

  if (!Array.isArray(favorites || favorites.length < 1)) {
    return [];
  }

  favorites.forEach((favorite: JournalModel) => {
    return db.foods.create(favorite);
  });
}

export const handlers = [...db.foods.toHandlers('rest')];

// Establish requests interception.
export function setupBrowserMocks() {
  seedDb();
  setupWorker(...handlers).start();
}