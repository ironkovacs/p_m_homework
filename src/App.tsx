
import './App.css'
import {JobListings} from "./Components/JobListings.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <JobListings />
        </QueryClientProvider>
    );
}

export default App
