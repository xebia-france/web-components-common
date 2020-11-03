import React from 'react';
import {Container, ImageContainer, CTA, Contain} from './styled';
import PropTypes from 'prop-types';
import {fileNameFromUrl} from "../../utils/functions";
import {generatePictureWebP} from "../../utils/gettersCommonElement";
import {getContentProps, getCTAProps, getTextProps} from "../../utils/gettersProperties";
import {TextCommon, ContentCommon} from '../../styles/common.styled';

const getImages = (field,assetsDirectory, data) => {
    if (!data.logo.file) {
        return null
    } else {
        return (
            <ImageContainer responsive={field.responsiveSettings}
                            basis={field.settings.basis}
                            border={field.settings.border}>
                {generatePictureWebP(`${assetsDirectory || ''}${ fileNameFromUrl(data.logo.file.url) }`, data.name)}
            </ImageContainer>);
    }

}

const buildComponent = (fields, field,language,assetsDirectory,  key, data) => {
    if (!fields[field]) return
    switch (field) {
        case 'Title':
            return <TextCommon key={key} {...getTextProps(field)}>{data.name}</TextCommon>

        case 'Content':
            return <ContentCommon  {...getContentProps(field)} key={key}
                                   dangerouslySetInnerHTML={{
                                       __html: data.title && data.title.childMarkdownRemark ?
                                           data.title.childMarkdownRemark.html
                                           : <p></p>
                                   }}
            />

        case 'Image':
            return this.getImages(fields[field],assetsDirectory, data);

        case 'CTA':
            return <CTA {...getCTAProps(field)} key={key}
                icon={fields[field].settings.icon}
                href={data.slug ? `/${data.slug}` : ''}
            >
                {
                    fields[field].content.icon && fields[field].content.icon[language] ?
                        <i>{fields[field].content.icon[language]}</i>
                        : null
                }
                <p> {fields[field].content.text ? fields[field].content.text[language] : ''}</p>
            </CTA>;

        default :
            return null;
    }
}

const HeaderCategory = ({fields, order, assetsDirectory, datafields, data}) => {
        const Template = fields.Template;

        const images = {
            M: {
                fileName: fileNameFromUrl(data.smallImage.file.url)
            },
            T: {
                fileName: fileNameFromUrl(data.image.file.url)
            },
            D: {
                fileName: fileNameFromUrl(data.image.file.url)
            }
        }

        return (
            <Container responsive={Template ? Template.responsiveSettings : []}
                       responsiveContent={Template ? Template.responsiveSettings : []}
                       asset={images}
                       assetsDirectory={assetsDirectory}
                       basis={Template && Template.settings ? Template.settings.basis : null}
                       border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
            >
                <Contain>
                    {
                        order ? order.map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i, data))
                            : ['Title', 'Content'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i, data))
                    }
                </Contain>
            </Container>
        );
}

HeaderCategory.defaultProps = {};

HeaderCategory.propTypes = {
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
export default HeaderCategory;
