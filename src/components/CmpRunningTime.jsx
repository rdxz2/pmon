import React from "react";
import "./CmpRunningTime.css";
import moment from "moment";

const CmpRunningTime = ({ initial, format }) => {
  // state
  const [time, timeSet] = React.useState(moment(initial));

  // effect
  React.useEffect(() => {
    const timeInterval = setInterval(() => handleAddSecond(), 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [time]);

  // handler
  const handleAddSecond = () => timeSet(_time => moment(_time).add(1, "seconds"));

  return <span className="running-time">{time.format(format || "DD MMM YYYY, HH:mm:ss")}</span>;
};

export default CmpRunningTime;
