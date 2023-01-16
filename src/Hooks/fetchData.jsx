import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import { Backend } from "../backendData";
const LINK = Backend.link;

const FetchData = (initialData, initialUrl) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const authenticationTokenNumber = localStorage.getItem("access-token");
  const headers = {
    "Content-type": "application/json",
    "access-token": authenticationTokenNumber,
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const data = await axios.get(`${LINK}/get_patient`, {
          headers: headers,
        });
        setData(data.data);
        console.log(data.data);

      } catch (err) {
        console.log("couldn't fetch data from backend via get info");
        console.log(err.message);
        setIsError(true);
      }
      setIsLoading(true);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default FetchData;
