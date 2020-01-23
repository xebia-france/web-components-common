import React, {Component} from 'react';
import {Container, Text, Content, ImageContainer, CTA} from './styled';
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";

class CardMultiCTA extends Component {
    buildComponent = (fields, field, key) => {
        if (!fields[field]) return
        switch (field) {
            case 'Title':
                return <Text
                    key={key}
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    basis={fields[field].settings.basis}
                    border={fields[field].settings.border}
                    as={fields[field].settings.seo.tag || 'h2'}
                >
                    {fields[field].content.text ? fields[field].content.text[this.props.language] : 'no text'}
                </Text>;

            case 'Tagline':
                return <Text
                    key={key}
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    basis={fields[field].settings.basis}
                    border={fields[field].settings.border}
                    as={fields[field].settings.seo.tag || 'h2'}
                >
                    {fields[field].content.text ? fields[field].content.text[this.props.language] : 'no text'}
                </Text>;

            case 'Content':
                return <Content
                    key={key}
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    basis={fields[field].settings.basis}
                    dangerouslySetInnerHTML={{
                        __html: fields[field].content.html ? fields[field].content.html[this.props.language] :
                            <p>no content</p>
                    }}
                />

            case 'Image':
                return this.getImages(fields[field]);

            case 'CTA' :
            case 'CTA2' :
            case 'CTA3' :

                return <CTA
                    key={key}
                    responsive={fields[field].responsiveSettings}
                    basis={fields[field].settings.basis}
                    typography={fields[field].settings.typography}
                    border={fields[field].settings.border}
                    icon={fields[field].settings.icon}
                    href={fields[field].content.link && !fields[field].settings.state.disabled ? fields[field].content.link[this.props.language] : ''}
                    target={fields[field].settings.state.external ? '_blank' : ''}
                    className={fields[field].settings.state.disabled ? 'disabled' : ''}
                    onClick={(e) => {
                        if (fields[field].settings.state.disabled) e.preventDefault();
                    }
                    }
                >
                    <p>
                        {
                            fields[field].content.icon && fields[field].content.icon[this.props.language] ?
                                <i>{fields[field].content.icon[this.props.language]}</i>
                                : null
                        }
                        {fields[field].content.text ? fields[field].content.text[this.props.language] : ''}</p>
                </CTA>;

            default :
                return null;
        }
    }

    getImages = field => {
        const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
        return field.content.images.map((image, i) => {
            const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
            if (!file) {
                return null
            } else {
                return (
                    <ImageContainer key={i}
                                    responsive={field.responsiveSettings}
                                    basis={field.settings.basis}
                                    border={field.settings.border}>
                        <img alt={image.alt[this.props.language]} src={`${this.props.assetsDirectory || ''}${ file }`}/>
                    </ImageContainer>);
            }

        });
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
                        : ['Title', 'Tagline', 'Content', 'Image', 'CTA', 'CTA2', 'CTA3'].map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                }
            </Container>
        );
    }
}


CardMultiCTA.defaultProps = {};

CardMultiCTA.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default CardMultiCTA;
