import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { UserProvider } from "./context/UserProvider";
import UserDetails from "./features/users/UserDetails";
const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/:id" element={<UserDetails />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
