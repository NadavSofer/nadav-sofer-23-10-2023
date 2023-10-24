const DAY_OF_THE_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const getDayOfTheWeek = (date) => {
  let d = new Date(date);
  return DAY_OF_THE_WEEK[d.getDay()]
}

export const getShortDate = (date) => {
  let d = new Date(date)
  return d.getDate() + '/' + eval(d.getMonth() + 1) + "/" + d.getFullYear();
}
