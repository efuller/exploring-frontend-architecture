import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import { FoodModel } from "../../models/foodModel.ts";

export const useFoods = () => {
  const [foods, setFoods] = useState<FoodModel[]>([]);
  const [pendingDelete, setPendingDelete] = useState('');

  const createFood = async (newFood: FoodModel) => {
    const result: AxiosResponse<FoodModel> = await axios.post('/foods', newFood)

    if (result.status === 201) {
      setFoods((prevState) => {
        return [...prevState, result.data];
      });
    }

    return result;
  }

  const deleteFood = async (id: string) => {
    const result: AxiosResponse<FoodModel> = await axios.delete(`/foods/${id}`)

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
    axios.get<FoodModel[]>('/foods')
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