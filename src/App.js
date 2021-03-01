import "./App.css";
import { Router, Switch, Route } from "react-router-dom";
import history from "./services/history";
import PrivateRoute from "./services/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Articles from "./pages/articles/Articles";
import ArticleAdd from "./pages/articles/ArticleEdit";
import ArticleEdit from "./pages/articles/ArticleEdit";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <Router history={history}>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/article/add" component={ArticleAdd} />
          <Route path="/article/:id/edit" component={ArticleEdit} />
          <Route path="/article/all" component={Articles} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
