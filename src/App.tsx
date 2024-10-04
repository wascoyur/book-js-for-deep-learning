import "./App.css";
import { TfFetcher } from "./common/TfjsFetcher/TfFetcher.tsx";
import { Header } from "./common/Header/Header.tsx";
import {menuItems} from "./common/Header/menuItems.ts";

function App() {
  return (
    <>
      <Header
        items={menuItems}
      />
      <TfFetcher />
    </>
  );
}

export default App;
