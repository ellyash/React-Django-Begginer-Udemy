import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import styled from "styled-components";
import Numbers from "./components/numbers";

function createAlert() {
  alert("Nice");
}

const pStyle = {
  fontSize: "2em",
  color: "red",
};

const Paragraph = styled.p`
  font-size: 3em;
  color: green;
`;

function App() {
  return (
    <div className="App">
      <Numbers />
    </div>
  );
}

export default App;
