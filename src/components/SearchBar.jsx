import busLogo from "../images/bus_logo.png";
import { useState, useEffect } from "react";
import ErrorMessage from "./components/ErrorMessage.jsx";

function Search({ setState, allRoutes }) {
  const [inputValue, setInputValue] = useState(""); // if there is no arugment, when you use any methods, it will show an error because the initial state is "undefined" instead.

  const [routeServices, setRouteServices] = useState([]);
  const [error, setError] = useState("");

  // use this function (onChange) to check the input whilst the user is typing ()
  function handleOnChange(e) {
    const processedInput = e.target.value
      .toUpperCase()
      .split(/[\s-]+/)
      .join("");
    setInputValue(processedInput);
  }

  async function handleSearch() {
    let serviceArr = [];
    allRoutes.map((route, index) => {
      if (route.route === inputValue) {
        serviceArr.push(route);
      }
    });
    if (!!serviceArr.length) {
      setState(serviceArr);
    } else {
      setError(`這條路線不存在!`);
    }
  }

  return (
    <>
      <form action="" className="mx-auto flex justify-center" method="GET">
        <input
          onChange={handleOnChange}
          type="search"
          className="rounded-lg h-[50px] w-[600px] border-4 border-gray-950 pl-3"
          placeholder="請輸入巴士路線搜尋"
          value={inputValue}
        />
        <button className="relative right-[60px] top-[5px]">
          <img src={busLogo} className="size-[55px]" alt="" />
        </button>
      </form>
      {!!error && <ErrorMessage message={error} />}
    </>
  );
}

export default Search;
