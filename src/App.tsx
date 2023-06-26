import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

import { useFoods } from "./hooks/useFoods";
import { useFavorites } from "./hooks/useFavorites";
import { FoodModel } from "./models/foodModel.ts";
import {useConfirmationModal} from "./components/ConfirmationModal/useConfirmationModal.ts";
import {ConfirmationModal} from "./components/ConfirmationModal";

import './App.css'

type FormInput = {
  title: string;
};

// Simple version of classNames.
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function App() {
  const {
    open,
    setOpen,
    cancelButtonRef,
    setConfirmed,
    confirmed,
  } = useConfirmationModal();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormInput>();
  const {
    foods,
    createFood,
    deleteFood,
    pendingDelete,
    setPendingDelete,
  } = useFoods();
  const {
    deleteFavoriteFromLocalStorage,
    isFavorite,
    saveFoodToLocalStorage
  } = useFavorites();

  const handleDeleteFood = async (id: string) => {
    await deleteFood(id);
  }

  const handleConfirmation = async (id: string) => {
    if (isFavorite(id)) {
      setOpen(true);
      setPendingDelete(id);
      return;
    }

    await  handleDeleteFood(id);
  }

  const handleFavorite = (food: FoodModel) => {
    if (isFavorite(food.id)) {
      return;
    }

    saveFoodToLocalStorage(food);
  }

  const onSubmit = async (data: FormInput) => {

    const newFood: FoodModel = {
      ...data,
      id: uuidv4(),
    };

    await createFood(newFood);

    // Reset form.
    reset();

    // Could check for errors and display a message.
  };

  useEffect(() => {
    if (confirmed && pendingDelete) {
      deleteFavoriteFromLocalStorage(pendingDelete);
       handleDeleteFood(pendingDelete);
      setOpen(false);
    }
  }, [confirmed, pendingDelete]);

  if (open) {
    return (
      <ConfirmationModal
        isOpen={open}
        setConfirmed={setConfirmed}
        cancelButtonRef={cancelButtonRef}
        setOpen={setOpen}
      />
    )
  }

  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-blue-400 font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-8">
            <h1 className="text-grey-darkest">Favorite Foods</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex mt-4">
                <input {...register('title', { required: true })} required className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Food" />
                <button type="submit" className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
              </div>
            </form>
          </div>
          {
            foods.length > 0 ? (
              <ul>
                {
                  foods.map((food) => (
                    <li key={food.id} className="flex mb-4 border p-2 text-left pl-6 items-center">
                      <p className="w-full text-grey-darkest">{food.title}</p>
                      <button
                        className={classNames(
                          isFavorite(food.id)
                            ? 'flex-no-shrink p-2 ml-4 mr-2 border-2 bg-red-400 rounded hover:text-white text-green border-green hover:bg-green'
                            : 'flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green'
                        )}
                        disabled={isFavorite(food.id)}
                        onClick={() => handleFavorite(food)}
                      >Favorite</button>
                      <button
                        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                        onClick={() => handleConfirmation(food.id)}
                      >Delete</button>
                    </li>
                  ))
                }
              </ul>
            ) : null
          }
        </div>
      </div>
    </>
  );
}

export default App
