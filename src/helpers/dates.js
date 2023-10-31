const DAY_OF_THE_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const getDayOfTheWeek = (date) => {
  let d = new Date(date);
  return DAY_OF_THE_WEEK[d.getDay()]
};

export const getShortDate = (date) => {
  let d = new Date(date)
  return d.getDate() + '/' + eval(d.getMonth() + 1);
};

export const getShortTime = (dateTimeString) => {
  try {
    const date = new Date(dateTimeString);
    if (isNaN(date)) {
      throw new Error("Invalid date");
    }

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes}`;
  } catch (error) {
    console.error(`Error in getShortTime: ${error.message}`);
    return "Invalid Time";
  };
}