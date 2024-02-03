import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import { JournalModel } from "../../models/journalModel.ts";

export const useFoods = () => {
  const [foods, setFoods] = useState<JournalModel[]>([]);
  const [pendingDelete, setPendingDelete] = useState('');

  const createFood = async (newFood: JournalModel) => {
    const result: AxiosResponse<JournalModel> = await axios.post('/foods', newFood)

    if (result.status === 201) {
      setFoods((prevState) => {
        return [...prevState, result.data];
      });
    }

    return result;
  }

  const deleteFood = async (id: string) => {
    const result: AxiosResponse<JournalModel> = await axios.delete(`/foods/${id}`)

    if (result.status === 200) {
      const removeDeletedFood = foods.filter((food) => food.id !== result.data.id);

      setFoods(() => {
        return [...removeDeletedFood];
      });
    }

    return result;
  }

  const exists = (id: string) => {
    const items = foods.filter((food) => food.id === id);

    return !!items.length;
  }

  useEffect(() => {
    axios.get<JournalModel[]>('/foods')
      .then((data) => {
        setFoods(data.data);
      });
  }, []);

  return {
    createFood,
    deleteFood,
    exists,
    pendingDelete,
    foods,
    setPendingDelete,
    setFoods
  }
}