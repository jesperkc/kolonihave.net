const timeFromNow = function (time) {
  // Get timestamps
  // console.log("timeFromNow time", time);
  var unixTime = new Date(time).getTime();
  // console.log("timeFromNow unixTime", unixTime);
  if (!unixTime) return;
  var now = new Date().getTime();

  // Calculate difference
  var difference = unixTime / 1000 - now / 1000;

  // Setup return object
  var tfn = {};

  // Check if time is in the past, present, or future
  tfn.when = "now";
  if (difference > 0) {
    tfn.when = "future";
  } else if (difference < -1) {
    tfn.when = "past";
  }

  // Convert difference to absolute
  difference = Math.abs(difference);

  // Calculate time unit
  if (difference / (60 * 60 * 24 * 365) > 1) {
    // Years
    tfn.unitOfTime = "år";
    tfn.time = Math.floor(difference / (60 * 60 * 24 * 365));
  } else if (difference / (60 * 60 * 24 * 45) > 1) {
    // Months
    tfn.time = Math.floor(difference / (60 * 60 * 24 * 45));
    tfn.unitOfTime = tfn.time > 1 ? "måneder" : "måned";
  } else if (difference / (60 * 60 * 24) > 1) {
    // Days
    tfn.time = Math.floor(difference / (60 * 60 * 24));
    tfn.unitOfTime = tfn.time > 1 ? "dage" : "dag";
  } else if (difference / (60 * 60) > 1) {
    // Hours
    tfn.time = Math.floor(difference / (60 * 60));
    tfn.unitOfTime = tfn.time > 1 ? "timer" : "time";
  } else if (difference / 60 > 1) {
    // Hours
    tfn.time = Math.floor(difference / 60);
    tfn.unitOfTime = tfn.time > 1 ? "minutter" : "minut";
  } else {
    // Seconds
    tfn.time = Math.floor(difference);
    tfn.unitOfTime = tfn.time > 1 ? "sekunder" : "sekund";
  }

  return tfn;
};

export const fromNowString = (time) => {
  const fromnow = timeFromNow(time);

  switch (fromnow.when) {
    case "future":
      return `Om ${fromnow.time} ${fromnow.unitOfTime}`;
    case "past":
      return `${fromnow.time} ${fromnow.unitOfTime} siden`;
    default:
      return "Nu";
  }
};

export const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};
