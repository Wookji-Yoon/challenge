import { useRecoilValue, useSetRecoilState } from "recoil";
import { categorySelector, IToDo, toDoListState } from "../atoms";

function ToDo({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoListState);
  const categories = useRecoilValue(categorySelector);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newCategory = event.currentTarget.name;
    setToDos((oldToDos) =>
      oldToDos.map((toDo) => {
        if (toDo.id === id) {
          return { ...toDo, category: newCategory };
        } else return toDo;
      })
    );
  };
  const removeToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => oldToDos.filter((toDo) => toDo.id !== id));
  };

  return (
    <li key={id}>
      {text}
      {categories.map((item) => (
        <button name={item} onClick={onClick}>
          {item}
        </button>
      ))}
      <button onClick={removeToDo}>X</button>
    </li>
  );
}

export default ToDo;
