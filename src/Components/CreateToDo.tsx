import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoListState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, reset } = useForm<IForm>();
  const category = useRecoilValue(categoryState);
  const setToDos = useSetRecoilState(toDoListState);
  const onValid = (data: IForm) => {
    setToDos((prev) => [
      ...prev,
      { id: Date.now(), text: data.toDo, category },
    ]);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        type="text"
        placeholder="What needs to be done?"
        {...register("toDo", { required: true })}
      />
      <input type="submit" />
    </form>
  );
}

export default CreateToDo;
