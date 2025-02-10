import { Routes, Route } from "react-router";
import { useEffect } from "react";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Portfolio from "./Pages/Portfolio";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
import Navbar from "./Components/Navbar";

function App() {
  const url: string = import.meta.env.VITE_SERVER;
  useEffect(() => {

    const fetchData = async () => {
      try {
        console.log("fetching from", url);
        const response = await fetch(`${url}/api`);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error("Fetching data has failed.", response.status);
        }
      } catch (error) {
        console.error("Error fetching the data.", error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;

//duhs

//neu anmelden agentur, rechtlichen beistand anfragen (document to fill out- free lawyer)
