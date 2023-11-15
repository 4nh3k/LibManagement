import { QueryClient, QueryClientProvider } from 'react-query';
import useRouteElement from './useRouteElement';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryclient = new QueryClient();
function App() {
  const routeElement = useRouteElement();
  return (
    <QueryClientProvider client={queryclient}>
      <div>{routeElement}</div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
