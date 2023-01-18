import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./Contexts/AuthContext";
import { SearchContextProvider } from "./Contexts/SearchContext";
import { PetsListProvider } from "./Contexts/PetsListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    //   <React.StrictMode>
    <AuthContextProvider>
        <SearchContextProvider>
            <PetsListProvider>
                <Router>
                    <App />
                </Router>
            </PetsListProvider>
        </SearchContextProvider>
    </AuthContextProvider>
    //   </React.StrictMode>
);
