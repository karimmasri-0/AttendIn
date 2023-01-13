import Auth from "./components/Auth/Auth";
import "./App.css";

function App() {
  const token = false;
  // const token = true;
  return <div>{!token ? <Auth /> : null}</div>;
}

export default App;
