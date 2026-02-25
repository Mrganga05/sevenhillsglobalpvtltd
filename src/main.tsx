import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import "./index.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <CartProvider>
                    <App />
                    <Toaster
                        position="top-right"
                        richColors
                        closeButton
                        toastOptions={{
                            duration: 4000,
                        }}
                    />
                </CartProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);
