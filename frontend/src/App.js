import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import RecipeScreen from './screens/RecipeScreen'
import { Container } from 'react-bootstrap'

function App() {
  return (
      <Router>
    <Header/>
    <main className='py-3'>
      <Container>
        <Route path = '/' component ={HomeScreen} exact/>
        <Route path = '/recipe/:id' component ={RecipeScreen}/>
      </Container>
    </main>
    <Footer/>
    
    </Router>
  );
}

export default App;
