import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </StrictMode>
);
