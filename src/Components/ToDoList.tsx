import { useRecoilState, useRecoilValue } from "recoil";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const categories = useRecoilValue(categoriesState);
  const onInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.currentTarget.value;
    setCategory(newCategory);
  };
  return (
    <>
      <h1>ToDos</h1>
      <hr />
      <CreateCategory />

      <br />
      <select title="select toDo" value={category} onInput={onInput}>
        {categories.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>

      <CreateToDo />

      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </>
  );
}

export default ToDoList;
