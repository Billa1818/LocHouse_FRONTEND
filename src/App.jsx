import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import AppRoute from './routes/AppRoute'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {

  return (
    <Router>
      <div>
        {/** <Header /> */}
<Header />
        <main>
          <AppRoute />
        </main>

        {/** <Footer /> */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
