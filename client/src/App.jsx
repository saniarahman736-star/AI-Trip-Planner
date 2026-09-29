import Navbar from './components/Navbar.jsx';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Home} from "./pages/Home.jsx";
import {Login} from "./pages/Login.jsx";
import {MyTrips} from "./pages/MyTrips.jsx";
import {Register} from "./pages/Register.jsx";
import {CreateTrip} from "./pages/CreateTrip.jsx";
import { ViewTrip } from './pages/ViewTrip.jsx';
import {Error} from "./pages/Error.jsx";
import Explore from "./pages/Explore.jsx";
const App=()=>{
  return(
    <>
     <BrowserRouter>
     <Navbar />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-trip" element={<CreateTrip />} />
      <Route path="/my-trips" element={<MyTrips />} />
      <Route path="/trip/:id" element={<ViewTrip />} />
      <Route path="/Error" element={<Error />} />
      <Route path="/destinations" element={<Explore />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}
export default App;
