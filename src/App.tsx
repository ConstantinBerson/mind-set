import { Fragment } from "react/jsx-runtime";
import "./App.css";
import { Note } from "./pages/Note/Note";

function App() {
  return (
    <Fragment>
      <div className="main-container">
        <Note/>
      </div>
    </Fragment>
  );
}

export default App;
