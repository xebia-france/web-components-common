
export const getDuration = (start, end) => {
    const startTime = new Date(start.replace(/ /g, "T"));
    const endTime = new Date(end.replace(/ /g, "T"));
    const difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
    return Math.round(difference / 60000);
}

export const getHourFromTime = (time) => time.split(' ')[1];
export const getDayFromTime = (time) => time.split(' ')[0];

export const getStringDate = (date, locale) => {
    console.log('LOCALE', locale);
    const time = new Date(date.replace(/ /g, "T"));
    const options = { month: 'long', day: 'numeric' };
    return time.toLocaleDateString(locale, options)
}