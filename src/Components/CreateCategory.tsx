import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoriesState } from "../atoms";

interface IForm {
  newCategory: string;
}

function CreateCategory() {
  const setCategories = useSetRecoilState(categoriesState);
  const { register, handleSubmit, reset } = useForm<IForm>();
  const onValid = (data: IForm) => {
    setCategories((prev) => [...prev, data.newCategory]);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        type="text"
        placeholder="Create New Category"
        {...register("newCategory")}
      />
      <input type="submit" value="Create" />
    </form>
  );
}

export default CreateCategory;
