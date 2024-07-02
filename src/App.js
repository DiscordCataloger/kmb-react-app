import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Search from "./components/SearchBar";

function App() {
  const [allRoutes, setAllRoutes] = useState([]);
  useEffect(() => {
    async function fetchRoutes() {
      try {
        const response = await fetch(
          "https://data.etabus.gov.hk//v1/transport/kmb/route"
        );
        const routes = await response.json();
        const data = routes.data;
        setAllRoutes(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchRoutes();
  }, []);
  const images = require.context("./images", true);
  const imageList = images.keys().map((image) => images(image));
  return (
    <div>
      {/*  Logos */}
      <div className="flex mx-auto w-auto justify-center place-content-center">
        <img className="w-40 mr-16 my-5" src={imageList[1]} alt="" />
        <img src={imageList[0]} className="size-[75px] my-9" alt="" />
      </div>

      {/* Input Field */}
      <Search />

      {/* Routes & Stop ETA */}
      <div
        id="output"
        className="mt-6 flex flex-row justify-center items-center"
      >
        {!!error && <ErrorMessage message={error} />}
      </div>
      <div
        id="outputRoute"
        className="mt-6 mx-auto w-3/5 flex flex-col justify-center items-center"
      ></div>
      <script src="./script.js"></script>
    </div>
  );
}

export default App;
