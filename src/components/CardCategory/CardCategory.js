import React, {Component} from 'react';
import {Container, ImageContainer, CTA} from './styled';
import PropTypes from 'prop-types';
import {fileNameFromUrl, getResponsiveKey} from "../../utils/functions";
import TextCustomContent from '../../functional/TextCustomContent';
import ContentMarkdownRemark from "../../functional/ContentMarkdownRemark";
import CTACustomLink from "../../functional/CTACustomLink";
import {getImageProps, getTemplatePropsWithImage} from "../../utils/gettersProperties";
import { generatePictureWebP } from "../../utils/gettersCommonElement";

class CardCategory extends Component {
    buildComponent = (fields, field, key) => {
        const {data} = this.props
        if (!fields[field]) return
        if(!data) return
        switch (field) {
            case 'Title':
                return <TextCustomContent key={key} field={fields[field]} content={data.name}/>

            case 'Content':
                return <ContentMarkdownRemark key={key} field={fields[field]} content={data.shortPresentation}/>

            case 'Image':
                return this.getImage(fields[field]);

            case 'CTA':
                return <CTACustomLink animateUnderline key={key} field={fields[field]} link={data.slug ? `/${data.slug}` : ''}
                                      language={this.props.language}/>

            default :
                return null;
        }
    }

    getImage = field => {
        if (!this.props.data || !this.props.data.logo || !this.props.data.logo.file) return null;
        return (
            <ImageContainer {...getImageProps(field)}>
                { generatePictureWebP(`${this.props.assetsDirectory || ''}${ fileNameFromUrl(this.props.data.logo.file.url) }`, this.props.data.name )}

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

CardCategory.defaultProps = {};

CardCategory.propTypes = {
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
export default CardCategory;
