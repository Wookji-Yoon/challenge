import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import ToDoList from "./Components/ToDoList";

const GlobalStyles = createGlobalStyle`
${reset};
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
body{font-family: 'Source Sans Pro', sans-serif;
background-color: ${(props) => props.theme.bgColor};
color: ${(props) => props.theme.fontColor};
transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;}
*{box-sizing:border-box;}
a{color:inherit;text-decoration:none;}
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <ToDoList />
    </>
  );
}

export default App;
