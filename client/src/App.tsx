import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddMovieForm from "./components/AddMovieForm";
import Movies from "./components/Movies";
import UpdateMovieForm from "./components/UpdateMovieForm";
import SearchMovie from "./components/SearchMovie";
import FilterMovie from "./components/FilterMovie";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/add-movie" element={<AddMovieForm />} />
          <Route path="/search" element={<SearchMovie />} />
          <Route path="/filter" element={<FilterMovie />} />
          <Route path="/update-movie/:id" element={<UpdateMovieForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
