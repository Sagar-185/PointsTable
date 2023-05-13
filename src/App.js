import "./App.css";
import React, { useState, useEffect } from "react";
import data from "./database/test.json";
import matchData from "./database/matches.json";
import kohli from "./media/kohli.gif";
import kohli2 from "./media/3-months-hardwork-became-vain-in-3-balls-virat-kohli.gif";

function App() {
  // const [seriesData, setSeriesData] = useState(null);
  const [teams, setTeams] = useState(data.teams);
  const [matches, setMatches] = useState(matchData.matches);
  const [showGif, setShowGif] = useState(false);
  const [isTop, setIsTop] = useState(false);

  const sortedTeams = [...teams].sort((a, b) => {
    // sort by points first
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    // if points are equal, sort by nrr
    return b.NRR - a.NRR;
  });

  useEffect(() => {
    const pointsDivs = document.querySelectorAll(".points");
    const isAllChecked = matches.every((match) => match.checked);
    setShowGif(isAllChecked);
    const index = sortedTeams.findIndex((team) => team.name === "RCB");
    if (index !== -1 && index < 4) {
      setIsTop(true);
    } else {
      setIsTop(false);
    }
    pointsDivs.forEach((div) => {
      div.classList.add("animated");
      setTimeout(() => {
        div.classList.remove("animated");
      }, 1000);
    });
  }, [teams]);

  if (!matches) {
    return <div>Loading...</div>;
  }
  // console.log(seriesData)

  // for (let i = 0; i < seriesData?.matchDetails?.length; i++) {
  //   if (seriesData?.matchDetails[i].matchDetailsMap?.match?.length === 2) {
  //     if (!seriesData?.matchDetails[i]?.matchDetailsMap?.match[0]?.matchScore) {
  //     let a1 = {
  //       home: seriesData?.matchDetails[i]?.matchDetailsMap?.match[0]?.matchInfo?.team1
  //         ?.teamSName,
  //       away: seriesData?.matchDetails[i]?.matchDetailsMap?.match[0]?.matchInfo?.team2
  //         ?.teamSName,
  //         homeW : false,
  //         checked : false,
  //         draw : false,
  //         awayW : false,
  //         date : seriesData?.matchDetails[i]?.matchDetailsMap?.key,
  //         time : "3PM IST",
  //     };
  //     modifiedData.push(a1);}
  //     if (!seriesData?.matchDetails[i]?.matchDetailsMap?.match[1]?.matchScore) {
  //     let a2 = {
  //       home: seriesData?.matchDetails[i]?.matchDetailsMap?.match[1]?.matchInfo?.team1
  //         ?.teamSName,
  //       away: seriesData?.matchDetails[i]?.matchDetailsMap?.match[1]?.matchInfo?.team2
  //         ?.teamSName,
  //         homeW : false,
  //         checked : false,
  //         draw : false,
  //         awayW : false,
  //         date : seriesData?.matchDetails[i]?.matchDetailsMap?.key,
  //         time : "7PM IST",
  //     };
  //     modifiedData.push(a2);}
  //   } else {if (!seriesData?.matchDetails[i]?.matchDetailsMap?.match[0]?.matchScore) {
  //     let a = {
  //       home: seriesData?.matchDetails[i]?.matchDetailsMap?.match[0]?.matchInfo?.team1
  //         ?.teamSName,
  //       away: seriesData?.matchDetails[i]?.matchDetailsMap?.match[0]?.matchInfo?.team2
  //         ?.teamSName,
  //         homeW : false,
  //         checked : false,
  //         draw : false,
  //         awayW : false,
  //         date : seriesData?.matchDetails[i]?.matchDetailsMap?.key,
  //         time : "7PM IST",
  //     };
  //     modifiedData.push(a);}
  //   }
  // }

  // const filteredData = modifiedData.map(obj => {
  //   return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
  // }).filter(obj => Object.keys(obj).length > 6);;
  // console.log(filteredData)

  // const {dataaa} = useIplSchedule();
  // console.log(dataaa)
  //this handles win for the home team
  const handleHomeW = (t1, t2, i) => {
    if (!matches[i].homeW) {
      const updated = [...matches];
      updated[i].homeW = true;
      updated[i].checked = true;
      const updatedData1 = teams.map((team) => {
        if (team.name === t1) {
          return {
            ...team,
            points: team.points + 2,
            Matches: team.Matches + 1,
            wins: team.wins + 1,
            NRR: team.NRR + 0.05,
          };
        } else if (team.name === t2) {
          return {
            ...team,
            Matches: team.Matches + 1,
            NRR: team.NRR - 0.05,
          };
        } else {
          return team;
        }
      });
      setTeams(updatedData1);
      if (matches[i].awayW) {
        //decrease points for away
        const updatedData = updatedData1.map((team) => {
          if (team.name === t2) {
            return {
              ...team,
              points: team.points - 2,
              NRR: team.NRR - 0.05,
              Matches: team.Matches - 1,
              wins: team.wins - 1,
            };
          } else if (team.name === t1) {
            return {
              ...team,
              Matches: team.Matches - 1,
              NRR: team.NRR + 0.05,
            };
          } else {
            return team;
          }
        });
        updated[i].awayW = false;
        setTeams(updatedData);
      }
      if (matches[i].draw) {
        //decrease points for away
        const updatedData = updatedData1.map((team) => {
          if (team.name === t2 || team.name === t1) {
            return {
              ...team,
              points: team.points - 1,
              Matches: team.Matches - 1,
            };
          } else {
            return team;
          }
        });
        updated[i].draw = false;
        setTeams(updatedData);
      }
      setMatches(updated);
    }
  };
  //this handles Draw
  const handleDraw = (t1, t2, i) => {
    if (!matches[i].draw) {
      const updated = [...matches];
      updated[i].draw = true;
      updated[i].checked = true;

      if (!matches[i].homeW && !matches[i].awayW) {
        const updatedData1 = teams.map((team) => {
          if (team.name === t1) {
            return {
              ...team,
              points: team.points + 1,
              NR: team.NR + 1,
              Matches: team.Matches + 1,
            };
          } else if (team.name === t2) {
            return {
              ...team,
              points: team.points + 1,
              NR: team.NR + 1,
              Matches: team.Matches + 1,
            };
          } else {
            return team;
          }
        });
        setTeams(updatedData1);
      }
      if (matches[i].awayW) {
        //decrease points for away
        const updatedData = teams.map((team) => {
          if (team.name === t2) {
            return {
              ...team,
              points: team.points - 1,
              NR: team.NR + 1,
              wins: team.wins - 1,
              NRR: team.NRR - 0.05,
            };
          } else if (team.name === t1) {
            return {
              ...team,
              points: team.points + 1,
              NR: team.NR + 1,
              NRR: team.NRR + 0.05,
            };
          } else {
            return team;
          }
        });
        updated[i].awayW = false;
        setTeams(updatedData);
      }
      if (matches[i].homeW) {
        //decrease points for away
        const updatedData = teams.map((team) => {
          if (team.name === t1) {
            return {
              ...team,
              points: team.points - 1,
              NR: team.NR + 1,
              wins: team.wins - 1,
              NRR: team.NRR - 0.05,
            };
          } else if (team.name === t2) {
            return {
              ...team,
              points: team.points + 1,
              NR: team.NR + 1,
              NRR: team.NRR + 0.05,
            };
          } else {
            return team;
          }
        });
        updated[i].homeW = false;
        setTeams(updatedData);
      }
      setMatches(updated);
    }
  };
  //this handles Away win
  const handleAwayW = (t1, t2, i) => {
    if (!matches[i].awayW) {
      const updated = [...matches];
      updated[i].awayW = true;
      updated[i].checked = true;
      const updatedData1 = teams.map((team) => {
        if (team.name === t1) {
          return {
            ...team,
            points: team.points + 2,
            Matches: team.Matches + 1,
            wins: team.wins + 1,
            NRR: team.NRR + 0.05,
          };
        } else if (team.name === t2) {
          return {
            ...team,
            Matches: team.Matches + 1,
            NRR: team.NRR - 0.05,
          };
        } else {
          return team;
        }
      });
      setTeams(updatedData1);

      if (matches[i].homeW) {
        const updatedData = updatedData1.map((team) => {
          if (team.name === t2) {
            return {
              ...team,
              points: team.points - 2,
              NRR: team.NRR - 0.05,
              Matches: team.Matches - 1,
              wins: team.wins - 1,
            };
          } else if (team.name === t1) {
            return {
              ...team,
              Matches: team.Matches - 1,
              NRR: team.NRR + 0.05,
            };
          } else {
            return team;
          }
        });
        // console.log("Updated data is awayW "+updatedData)
        updated[i].homeW = false;
        setTeams(updatedData);
      }
      if (matches[i].draw) {
        //decrease points for both
        const updatedData = updatedData1.map((team) => {
          if (team.name === t2) {
            return {
              ...team,
              points: team.points - 1,
              Matches: team.Matches - 1,
            };
          } else if (team.name === t1) {
            return {
              ...team,
              points: team.points - 1,
              Matches: team.Matches - 1,
            };
          } else {
            return team;
          }
        });
        updated[i].draw = false;
        setTeams(updatedData);
      }
      // console.log("Updated1 data is awayW "+updatedData1)

      setMatches(updated);
    }
  };

  //Sorting the points-table

  //Animation if anything in pointstable changes

  return (
    <div className="center">
      <div className="row container_body">
        <div className="right" >
          <div className="title" >
          <h1>IPL</h1>
          <h6>Playoffs Forecast</h6></div>
          <div className="points__table">
            <div className="table__heading" >Tournament Table</div>
            <div className="points__table__card header row">
              <div className="points__table__card_name">Name</div>
              <div className="points__table__card_no">N</div>
              <div className="points__table__card_Win">W</div>
              <div className="points__table__card_NR">N/R</div>
              <div className="points__table__card_points">Pts</div>
              <div className="points__table__card_NRR">NRR</div>
            </div>

            {sortedTeams.map((team, i) => (
              <div key={i} className="points__table__card row points">
  
                <div className="points__table__card_name">{team.name}</div>
                <div className="points__table__card_no">{team.Matches}</div>
                <div className="points__table__card_Win">{team.wins}</div>
                <div className="points__table__card_NR">{team.NR}</div>
                <div className="points__table__card_points">{team.points}</div>
                <div className="points__table__card_NRR">
                  {team.NRR.toFixed(2)}

                </div>
              </div>
            ))}
            {showGif && isTop && (
              <div className="overlay">
                <p>
                  RCB is qualified, you can save humanity and remove this GIF if
                  you make RCB disqualify
                </p>
                <iframe src={kohli} className="gif"></iframe>
              </div>
            )}
            {showGif && !isTop && (
              <div className="overlay">
                <p>Agle sala cup naam de friends</p>
                <iframe src={kohli2} className="gif"></iframe>
              </div>
            )}
          </div>
        </div>

        <div className="matches-container column">
          <div className="test123">
            {matches.map((match, i) => (
              <div key={i} className="match-card column">
                <div className="row match-header">
                  <div> {match.date}</div>
                  <div> {match.time}</div>
                </div>
                <div>Select the winner</div>
                <div className="row match-body">
                  <button
                    className={matches[i].homeW ? "selected" : ""}
                    onClick={() => handleHomeW(match.home, match.away, i)}
                  >
                    {match.home}
                  </button>
                  <button
                    className={matches[i].draw ? "selected" : ""}
                    onClick={() => handleDraw(match.home, match.away, i)}
                  >
                    Rain
                  </button>
                  <button
                    className={matches[i].awayW ? "selected" : ""}
                    onClick={() => handleAwayW(match.away, match.home, i)}
                  >
                    {match.away}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
