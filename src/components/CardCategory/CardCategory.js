import React, {Component} from 'react';
import {Container, Text, Content, ImageContainer, CTA} from './styled';
import PropTypes from 'prop-types';
import {fileNameFromUrl, getResponsiveKey} from "../../utils/functions";

class CardCategory extends Component {
    buildComponent = (fields, field, key) => {
        const { data } = this.props
        if (!fields[field]) return
        switch (field) {
            case 'Title':
                return <Text
                        responsive={fields[field].responsiveSettings}
                        typography={fields[field].settings.typography}
                        basis={fields[field].settings.basis}
                        border={fields[field].settings.border}
                        as={'h4'}
                    >
                        { data.name }
                    </Text>

            case 'Content':
                return <Content
                    key={key}
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    basis={fields[field].settings.basis}
                    dangerouslySetInnerHTML={{
                        __html: data.presentation && data.presentation.childMarkdownRemark ?
                           data.presentation.childMarkdownRemark.html
                            : <p></p>
                    }}
                />

            case 'Image':
                return this.getImages(fields[field]);

            case 'CTA':
                return <CTA
                    key={key}
                    responsive={fields[field].responsiveSettings}
                    basis={fields[field].settings.basis}
                    typography={fields[field].settings.typography}
                    border={fields[field].settings.border}
                    icon={fields[field].settings.icon}
                    href={data.slug ? `/${data.slug}` : ''}
                >
                    {
                        fields[field].content.icon && fields[field].content.icon[this.props.language] ?
                            <i>{fields[field].content.icon[this.props.language]}</i>
                            : null
                    }
                    <p> {fields[field].content.text ? fields[field].content.text[this.props.language] : ''}</p>

                </CTA>;

            default :
                return null;
        }
    }


    getImages = field => {
        if (!this.props.data.logo.file) {
            return null
        } else {
            return (
                <ImageContainer responsive={field.responsiveSettings}
                                basis={field.settings.basis}
                                border={field.settings.border}>
                    <img alt={this.props.data.name}
                         src={`${this.props.assetsDirectory || ''}${ fileNameFromUrl(this.props.data.logo.file.url) }`}/>
                </ImageContainer>);
        }

    }

    render() {
        const {fields, order, assetsDirectory} = this.props;

        const Template = fields.Template;

        return (
            <Container responsive={Template ? Template.responsiveSettings : []}
                       responsiveContent={getResponsiveKey(Template.content.images[0].asset)}
                       asset={Template.content.images[0].asset || null}
                       assetsDirectory={assetsDirectory}
                       basis={Template && Template.settings ? Template.settings.basis : null}
                       border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
            >
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
