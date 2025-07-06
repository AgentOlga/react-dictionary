import logo from "./logo.png";
import "./App.css";
import Dictionary from "./Dictionary.js";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo img-fluid" alt="logo" />
      </header>
      <main>
        <Dictionary defaultKeyword="programming" />
      </main>
      <footer className="App-footer">
        Coded by{" "}
        <a
          href="https://www.linkedin.com/in/olga-philippova-89886b48/"
          target="_blank"
          rel="noreferrer"
        >
          Olga Phili
        </a>{" "}
        and is{" "}
        <a
          href="https://https://github.com/AgentOlga/react-dictionary"
          target="_blank"
          rel="noreferrer"
        >
          open-sourced on GitHub
        </a>{" "}
        💜
      </footer>
    </div>
  );
}