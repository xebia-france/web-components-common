import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import {Container, Box, Separator} from './styled';
import {TextCommon} from '../../styles/common.styled';
import {getTemplateProps, getTemplatePropsWithImage, getTextProps} from "../../utils/gettersProperties";

const CountdownDate = ({fields, order, assetsDirectory, language}) => {

    const [inProgress, setInProgress] = useState(false);
    const [isPassed, setIsPassed] = useState(false);

    const calculateTimeLeft = () => {
        let difference = +new Date(fields.DateStart.content.date) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        } else {
            let compareWithEnd = +new Date(fields.DateEnd.content.date) - +new Date();
            if (compareWithEnd > 0) {
                if (!inProgress) setInProgress(true);
                if (isPassed) setIsPassed(false);
            } else {
                if (inProgress) setInProgress(false);
                if (!isPassed) setIsPassed(true)
            }
        }
        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const adaptPlural = (number, string) => number <= 1 ? string.replace(/s\b/ig, '') : string

    return (
        <Container  {...getTemplatePropsWithImage(fields.Template)}
                    assetsDirectory={assetsDirectory}>
            {
                inProgress && (fields.TextPresent.content.text && fields.TextPresent.content.text[language]) &&
                <TextCommon {...getTextProps(fields.TitleContextual)}>{fields.TextPresent.content.text ? fields.TextPresent.content.text[language] : ''}</TextCommon>
            }
            {
                isPassed && (fields.TextPast.content.text && fields.TextPast.content.text[language]) &&
                <TextCommon {...getTextProps(fields.TitleContextual)}>{fields.TextPast.content.text ? fields.TextPast.content.text[language] : ''}</TextCommon>
            }
            {
                !isEmpty(timeLeft) && <>
                    <Box>
                        <TextCommon {...getTextProps(fields.Title)}>{ timeLeft.days  <= 9 ? '0' : '' }{timeLeft.days}</TextCommon>
                        {
                            (fields.TextDays.content.text && fields.TextDays.content.text[language]) &&
                            <TextCommon {...getTextProps(fields.Tagline)}>{fields.TextDays.content.text ? adaptPlural(timeLeft.days, fields.TextDays.content.text[language]) : ''}</TextCommon>
                        }
                    </Box>
                    <Separator {...getTemplateProps(fields.Separator)}></Separator>
                    <Box>
                        <TextCommon {...getTextProps(fields.Title)}>{ timeLeft.hours  <= 9 ? '0' : '' }{timeLeft.hours}</TextCommon>
                        {
                            (fields.TextHours.content.text && fields.TextHours.content.text[language]) &&
                            <TextCommon {...getTextProps(fields.Tagline)}>{fields.TextHours.content.text ? adaptPlural(timeLeft.hours, fields.TextHours.content.text[language]) : ''}</TextCommon>
                        }
                    </Box>
                    <Separator {...getTemplateProps(fields.Separator)}></Separator>
                    <Box>
                        <TextCommon {...getTextProps(fields.Title)}>{ timeLeft.minutes  <= 9 ? '0' : '' }{timeLeft.minutes}</TextCommon>
                        {
                            (fields.TextMinutes.content.text && fields.TextMinutes.content.text[language]) &&
                            <TextCommon {...getTextProps(fields.Tagline)}>{fields.TextMinutes.content.text ? adaptPlural(timeLeft.minutes,fields.TextMinutes.content.text[language]) : ''}</TextCommon>
                        }
                    </Box>
                    <Separator {...getTemplateProps(fields.Separator)}></Separator>
                    <Box>
                        <TextCommon {...getTextProps(fields.Title)}>{ timeLeft.seconds  <= 9 ? '0' : '' }{timeLeft.seconds}</TextCommon>
                        {
                            (fields.TextSeconds.content.text && fields.TextSeconds.content.text[language]) &&
                            <TextCommon {...getTextProps(fields.Tagline)}>{fields.TextSeconds.content.text ? adaptPlural(timeLeft.seconds, fields.TextSeconds.content.text[language]) : ''}</TextCommon>
                        }
                    </Box>
                </>
            }
        </Container>
    );
}

CountdownDate.defaultProps = {};

CountdownDate.propTypes = {
    order: PropTypes.arrayOf(PropTypes.string),
    fields: PropTypes.shape({
        Template: PropTypes.object,
        DateStart: PropTypes.object,
        DateEnd: PropTypes.object,
        Separator: PropTypes.object,
        Tagline: PropTypes.object,
        TextDays: PropTypes.object,
        TextHours: PropTypes.object,
        TextMinutes: PropTypes.object,
        TextSeconds: PropTypes.object,
        TextPresent: PropTypes.object,
        TextPast: PropTypes.object,
        Title: PropTypes.object,
        TitleContextual: PropTypes.object,
    }),
    language: PropTypes.number.isRequired,
    assetsDirectory: PropTypes.string
};
export default CountdownDate;
