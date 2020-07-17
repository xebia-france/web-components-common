
export const getDuration = (start, end) => {
    const startTime = new Date(start.replace(/ /g, "T"));
    const endTime = new Date(end.replace(/ /g, "T"));
    const difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
    return Math.round(difference / 60000);
}

export const getHourFromTime = (time) => time.split(' ')[1];
