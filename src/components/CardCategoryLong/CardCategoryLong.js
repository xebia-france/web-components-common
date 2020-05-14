import React, {Component} from 'react';
import {Container, ImageContainer,  Content} from './styled';
import PropTypes from 'prop-types';
import {fileNameFromUrl, getResponsiveKey} from "../../utils/functions";
import TextCustomContent from '../../functional/TextCustomContent';
import CTACustomLink from "../../functional/CTACustomLink";
import {getImageProps, getTemplatePropsWithImage} from "../../utils/gettersProperties";

class CardCategoryLong extends Component {
    buildComponent = (fields, field, key) => {
        const {data} = this.props
        if (!fields[field]) return
        if(!data) return
        switch (field) {
            case 'Title':
                return <TextCustomContent key={key} field={fields[field]} content={data.name}/>

            case 'Content':
                const Settings = {
                    Template: fields.Template,
                    Heading1: fields.Heading1,
                    Heading2: fields.Heading2,
                    Heading3: fields.Heading3,
                    Content: fields.Content,
                    ContentBold: fields.ContentBold,
                    ContentLink: fields.ContentLink
                }
                return <Content {...this.getContentProps(Settings)}
                                dangerouslySetInnerHTML={{
                                    __html: data.presentation && data.presentation.childMarkdownRemark ?
                                        data.presentation.childMarkdownRemark.html
                                        : <p></p>
                                }}
                />
                //return <ContentMarkdownRemark key={key} field={fields[field]} content={data.presentation}/>

            case 'Image':
                return this.getImage(fields[field]);

            case 'CTA':
                return <CTACustomLink animateUnderline key={key} field={fields[field]} link={data.slug ? `/${data.slug}` : ''}
                                      language={this.props.language}/>

            default :
                return null;
        }
    }

    getContentProps = (settings) => {
        return {
            responsive: settings.Content.responsiveSettings,
            typography: settings.Content.settings.typography,
            basis: settings.Content.settings.basis,
            typographyBold: settings.ContentBold ? settings.ContentBold.settings.typography : null,
            basisBold: settings.ContentBold ? settings.ContentBold.settings.basis : null,
            typographyLink: settings.ContentLink ? settings.ContentLink.settings.typography : null,
            basisLink: settings.ContentLink ? settings.ContentLink.settings.basis : null,
            typographyHeading1: settings.Heading1.settings.typography,
            basisHeading1: settings.Heading1.settings.basis,
            typographyHeading2: settings.Heading2.settings.typography,
            basisHeading2: settings.Heading2.settings.basis,
            typographyHeading3: settings.Heading3.settings.typography,
            basisHeading3: settings.Heading3.settings.basis,
        }
    }

    getImage = field => {
        if (!this.props.data || !this.props.data.logo || !this.props.data.logo.file) return null;
        return (
            <ImageContainer {...getImageProps(field)}>
                <img alt={this.props.data.name}
                     src={`${this.props.assetsDirectory || ''}${ fileNameFromUrl(this.props.data.logo.file.url) }`}/>
            </ImageContainer>);
    }

    render() {
        const {fields, order, assetsDirectory, data} = this.props;
        if(!data) return null



        return (
            <Container {...getTemplatePropsWithImage(fields.Template)} assetsDirectory={assetsDirectory}>
                {
                    order ? order.map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                        : ['Title', 'Content', 'Image', 'CTA'].map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                }
            </Container>
        );
    }
}

CardCategoryLong.defaultProps = {};

CardCategoryLong.propTypes = {
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
export default CardCategoryLong;
