import React from 'react';
import './CmpRunningTime.css';
import moment from 'moment';
import { formatDateTime } from '../constants/ConstDateFormats';

const CmpRunningTime = ({ initial, format, isBlinking }) => {
  // START --- state

  // time
  const [time, timeSet] = React.useState(moment(initial));

  // time
  const [isHalfSecond, isHalfSecondSet] = React.useState(true);

  // END --- state

  // START --- context

  // END --- context

  // START --- other variables

  // END --- other variables

  // START --- handler

  // add 1/2 second
  const handleAddHalfSecond = React.useCallback(() => {
    // set half second state to make blinking separator animation
    isHalfSecondSet(_isHalfSecond => !_isHalfSecond);

    // add 1/2 second
    timeSet(_time => moment(_time).add(0.5, 'seconds'));
  }, []);

  // render properly formatted time
  const handleRenderTimeFormatted = _time => {
    // format time regularly
    const timeFormatted = time.format(format || formatDateTime.running);

    // if it is a second and user wants it to be blinking
    if (!isHalfSecond && isBlinking) return timeFormatted.replace(/:/g, ' ');

    return timeFormatted;
  };

  // END --- handler

  // START --- effect

  // interval setter/clearer
  React.useEffect(() => {
    // set interval
    const timeInterval = setInterval(() => handleAddHalfSecond(), 500);

    // clear interval on component dispose
    return () => {
      clearInterval(timeInterval);
    };
  }, [handleAddHalfSecond]);

  // END --- effect

  return <span className="running-time">{handleRenderTimeFormatted(time)}</span>;
};

export default CmpRunningTime;
