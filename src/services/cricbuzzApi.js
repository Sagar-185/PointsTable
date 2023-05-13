import { useState, useEffect } from "react";
import axios from "axios";

const useGetMatchData = () => {
  const [dataa, setDataa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: "https://cricbuzz-cricket.p.rapidapi.com/series/v1/5945",
    headers: {
      "X-RapidAPI-Key": "4530319771msh126b09f1d1d51aep133738jsn69f17cd9a002",
      "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.request(options);
        setDataa(response.data);
          console.log(dataa)
      } catch (error) {
        setError(error);
        console.log("error occured " + error);
      } finally {
        setLoading(false);
        console.log("Cricbuzz Api Loaded succesfully");
      }
    };

    fetchCoins();
  }, []);
  return { dataa, loading, error };
}
export default useGetMatchData;
