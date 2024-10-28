import { useRoutes } from "react-router-dom";
import publicRoutes from "./routes";
import DefaultLayout from "./components/defaultLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/authContext";
function App() {

  return (<div className="App">
    <AuthProvider>
      <DefaultLayout>
        {
          useRoutes(publicRoutes)
        }
      </DefaultLayout>
    </AuthProvider>





  </div>);
}

export default App;