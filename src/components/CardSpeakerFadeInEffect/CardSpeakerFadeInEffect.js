import React, {useRef, useLayoutEffect, useState} from 'react';
import {Container, ContainerActive, ShortPresentation} from './styled';
import Text from '../../functional/Text';
import Content from '../../functional/Content';
import {TextCommon} from "../../styles/common.styled";

import PropTypes from 'prop-types';
import {getContentProps, getTemplatePropsWithImage, getTextProps} from "../../utils/gettersProperties";

const CardSpeakerFadeInEffect = ({fields, order, assetsDirectory, language}) => {
    const ContentBold = fields.ContentBold ? {...getContentProps(fields.ContentBold)} : null;


    const [isActive, setIsActive] = useState(false);

    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({width: 0, height: 0});

    let movement_timer = null;
    const RESET_TIMEOUT = 100;

    const test_dimensions = () => {
       if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });

        }
    }

    useLayoutEffect(() => {
        test_dimensions();
    }, []);

    if (typeof window !== 'undefined' && typeof document !== `undefined`) {
        window.addEventListener('resize', () => {
            clearInterval(movement_timer);
            movement_timer = setTimeout(test_dimensions, RESET_TIMEOUT);
        });
    }

    return (
        <Container dynamicHeight={dimensions.width} fadeAnimation={fields.TemplateActive}
                   ref={targetRef}  {...getTemplatePropsWithImage(fields.Template)} contentBold={ContentBold}
                   assetsDirectory={assetsDirectory} className={isActive ? 'active' : 'inactive'}
                   onClick={() => setIsActive(!isActive)}>
            <ShortPresentation>
                {fields.TextName && <Text field={fields.TextName} language={language}/>}
                {fields.TextJob && <Text field={fields.TextJob} language={language}/>}
            </ShortPresentation>
            {
                fields.TemplateActive &&
                <ContainerActive onClick={() => setIsActive(!isActive)}  {...getTemplatePropsWithImage(fields.TemplateActive)} contentBold={ContentBold}
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
