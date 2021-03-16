import React, { useRef, useLayoutEffect, useState } from 'react';
import {Container,ContainerActive, ShortPresentation} from './styled';
import Text from '../../functional/Text';
import Content from '../../functional/Content';
import CTA from '../../functional/CTA'
import Image from "../../functional/Image";
import { TextCommon} from "../../styles/common.styled";

import PropTypes from 'prop-types';
import {getContentProps, getTemplatePropsWithImage, getTextProps} from "../../utils/gettersProperties";
import {useWindowSize} from "../../utils/customHooks";


const buildComponent = (fields, field, language, assetsDirectory, key) => {
    if (!fields[field]) return
    switch (field) {
        case 'Title':
            return <Text key={key} field={fields[field]} language={language}/>;

        case 'Tagline':
            return <Text key={key} field={fields[field]} language={language}/>;

        case 'Content':
            return <Content key={key} field={fields[field]} language={language}/>;

        case 'Image':
            return <Image key={key} field={fields[field]} language={language}
                          assetsDirectory={assetsDirectory}/>

        case 'CTA':
            return <CTA key={key} field={fields[field]} language={language}/>;
        default :
            return null;
    }
}

const CardSpeakerFadeInEffect = ({fields, order, assetsDirectory, language}) => {
    const ContentBold = fields.ContentBold ? {...getContentProps(fields.ContentBold)} : null;


    const [isActive, setIsActive] = useState(false);

    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({ width:0, height: 0 });

    // holds the timer for setTimeout and clearInterval
    let movement_timer = null;

    // the number of ms the window size must stay the same size before the
    // dimension state variable is reset
    const RESET_TIMEOUT = 100;

    const test_dimensions = () => {
        // For some reason targetRef.current.getBoundingClientRect was not available
        // I found this worked for me, but unfortunately I can't find the
        // documentation to explain this experience
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });

        }
    }

    // This sets the dimensions on the first render
    useLayoutEffect(() => {
        test_dimensions();
    }, []);

    if (typeof window !== 'undefined' && typeof document !== `undefined`) {
        window.addEventListener('resize', ()=>{
            clearInterval(movement_timer);
            movement_timer = setTimeout(test_dimensions, RESET_TIMEOUT);
        });
    }

    return (
        <Container ref={targetRef} dynamicHeight={dimensions.width} fadeAnimation={fields.TemplateActive}  ref={targetRef}  {...getTemplatePropsWithImage(fields.Template)} contentBold={ContentBold}
                    assetsDirectory={assetsDirectory} className={isActive ? 'active' : ''} onClick={() => setIsActive(!isActive)}>
            <ShortPresentation>
                {fields.TextName && <Text field={fields.TextName} language={language}/>}
                {fields.TextJob && <Text field={fields.TextJob} language={language}/>}
            </ShortPresentation>
            {
                fields.TemplateActive &&
                <ContainerActive  {...getTemplatePropsWithImage(fields.TemplateActive)} contentBold={ContentBold}
                                                       assetsDirectory={assetsDirectory}>
                    {fields.TextNameActive &&
                        <TextCommon {...getTextProps(fields.TextNameActive)}>{fields.TextName.content.text ? fields.TextName.content.text[language] : null}</TextCommon>
                    }
                    {fields.ContentTalksSession && <Content field={fields.ContentTalksSession} language={language}/>}
                    {fields.ContentTalksInfo && <Content field={fields.ContentTalksInfo} language={language}/>}
                </ContainerActive>
            }

        </Container>
    );
}

CardSpeakerFadeInEffect.defaultProps = {};

CardSpeakerFadeInEffect.propTypes = {
    order: PropTypes.arrayOf(PropTypes.string),
    fields: PropTypes.shape({
        Template: PropTypes.object,
        Title: PropTypes.object,
        Tagline: PropTypes.object,
        Content: PropTypes.object,
        Image: PropTypes.object,
        CTA: PropTypes.object
    }),
    language: PropTypes.number.isRequired,
    assetsDirectory: PropTypes.string
};
export default CardSpeakerFadeInEffect;
