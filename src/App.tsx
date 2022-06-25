import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";
import { Router } from "./Router";

const onSuccess = (response: any) => console.log(response);
const onFailure = (response: any) => console.error(response);

function App() {
  return (
    <div>
      <ApolloProvider client={client} >
        <Router />
      </ApolloProvider>

    </div>
  );
}

export default App;
