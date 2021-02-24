import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import PrivateRoute from "./services/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Articles from "./pages/articles/Articles";
import ArticleAdd from "./pages/articles/ArticleEdit";
import { AuthProvider } from "./providers/AuthProvider";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/article/add" component={ArticleAdd} />
          <Route path="/articles" component={Articles} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
