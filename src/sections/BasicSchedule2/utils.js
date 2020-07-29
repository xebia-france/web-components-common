
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


const SET1 = ['opening', 'keynote', 'closing'];
const SET2 = ['breakfast', 'lunch', 'break', 'party','cocktail' ];

export const getBasisByType = (type, settings) => {

    if(SET1.includes(type)){
        return settings.set1Bkg;
    }else if(SET2.includes(type)){
        return settings.set2Bkg
    }else{
        return settings.set3Bkg
    }

}
export const getTitleSettingsByType = (type, settings) => {

    if(SET1.includes(type)){
        return settings.set1Title;
    }else if(SET2.includes(type)){
        return settings.set2Title
    }else{
        return settings.set3Title
    }

}

export const getTextSettingsByType = (type, settings) => {
    if(SET1.includes(type)){
        return settings.set1Text;
    }else if(SET2.includes(type)){
        return settings.set2Text;
    }else{
        return settings.set3Text
    }

}