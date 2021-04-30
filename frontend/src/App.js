import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import RecipeScreen from "./screens/RecipeScreen";
import FavScreen from "./screens/FavScreen";
import { Container } from "react-bootstrap";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import RecipeListScreen from "./screens/RecipeListScreen";
import RecipeEditScreen from "./screens/RecipeEditScreen";
import ContactScreen from "./screens/ContactScreen";


function App() {

  return (

    <Router>
      
    <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/contact" component={ContactScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/recipe/:id" component={RecipeScreen} />
          <Route path="/fav/:id?" component={FavScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/recipe/:id/edit" component={RecipeEditScreen} />
          <Route path="/admin/recipelist" component={RecipeListScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
