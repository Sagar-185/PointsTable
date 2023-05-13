import axios from 'axios';

const fetchData = async () => {
  const options = {
    method: 'GET',
    url: 'https://cricbuzz-cricket.p.rapidapi.com/series/v1/5945',
    headers: {
      'X-RapidAPI-Key': '4530319771msh126b09f1d1d51aep133738jsn69f17cd9a002',
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    let modifiedData = [];
    for (let i = 0; i < response.data?.matchDetails?.length; i++) {
      if (response.data?.matchDetails[i].matchDetailsMap?.match?.length === 2) {
        if (!response.data?.matchDetails[i]?.matchDetailsMap?.match[0]?.matchScore) {
          let a1 = {
            home: response.data?.matchDetails[i]?.matchDetailsMap?.match[0]?.matchInfo?.team1
              ?.teamSName,
            away: response.data?.matchDetails[i]?.matchDetailsMap?.match[0]?.matchInfo?.team2
              ?.teamSName,
              homeW : false,
              checked : false,
              draw : false,
              awayW : false,
              date : response.data?.matchDetails[i]?.matchDetailsMap?.key,
              time : "3PM IST",
          };
          modifiedData.push(a1);}
          if (!response.data?.matchDetails[i]?.matchDetailsMap?.match[1]?.matchScore) {
          let a2 = {
            home: response.data?.matchDetails[i]?.matchDetailsMap?.match[1]?.matchInfo?.team1
              ?.teamSName,
            away: response.data?.matchDetails[i]?.matchDetailsMap?.match[1]?.matchInfo?.team2
              ?.teamSName,
              homeW : false,
              checked : false,
              draw : false,
              awayW : false,
              date : response.data?.matchDetails[i]?.matchDetailsMap?.key,
              time : "7PM IST",
          };
          modifiedData.push(a2);}
        } else {if (!response.data?.matchDetails[i]?.matchDetailsMap?.match[0]?.matchScore) {
          let a = {
            home: response.data?.matchDetails[i]?.matchDetailsMap?.match[0]?.matchInfo?.team1
              ?.teamSName,
            away: response.data?.matchDetails[i]?.matchDetailsMap?.match[0]?.matchInfo?.team2
              ?.teamSName,
              homeW : false,
              checked : false,
              draw : false,
              awayW : false,
              date : response.data?.matchDetails[i]?.matchDetailsMap?.key,
              time : "7PM IST",
          };
          modifiedData.push(a);}
        }
      }

      const filteredData = modifiedData.map(obj => {
        return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
      }).filter(obj => Object.keys(obj).length > 6);
      console.log(filteredData)

      return filteredData;
    } catch (error) {
      console.error(error);
    }
};

export default fetchData;
