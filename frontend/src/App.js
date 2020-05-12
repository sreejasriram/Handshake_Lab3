import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import backendURI from './webConfig';
const client = new ApolloClient({
  uri: `${backendURI}/graphql`
});

class App extends Component{
render(){
  return(
    <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
       <Main/>
      </div>
    </BrowserRouter>
     </ApolloProvider>
  )
}
}

export default App;

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
