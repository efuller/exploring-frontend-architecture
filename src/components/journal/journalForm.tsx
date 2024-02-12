import { useForm } from "react-hook-form";
import { FormInput } from "../../App.tsx";
import { useEffect } from "react";

type JournalFormProps = {
  onSubmit: (data: FormInput) => void;
}

export const JournalForm = ({ onSubmit }: JournalFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset
  } = useForm<FormInput>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex mt-4">
        <input
          {...register('title', {required: true})}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          id="journal-input"
          placeholder="Add Journal"
        />
        <button
          id="submit-btn"
          type="submit"
          className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
        >
          Add
        </button>
      </div>
    </form>
  )
}