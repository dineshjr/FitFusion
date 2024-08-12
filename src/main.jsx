import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import { store } from './redux/store.js'
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <ChakraProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </Provider>
);
