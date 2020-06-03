import React, {Component} from 'react';
import {Container, Text, Content, ImageContainer, CTA, LinedCTA} from './styled';
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";

class CardCTALinedUp extends Component {
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
            case 'DupCTA' :

                return this.getAllCTA();

            default :
                return null;
        }
    }

    getAllCTA = () => {
        return (<LinedCTA>
            {

                Object.keys(this.props.fields).map((key, i) => {
                    if (key.includes('DupCTA')) {
                        return Object.assign(this.props.fields[key])
                    }
                }).filter(el => el)
                    .map((cta, i) => <CTA
                        key={i}
                        responsive={cta.responsiveSettings}
                        basis={cta.settings.basis}
                        typography={cta.settings.typography}
                        border={cta.settings.border}
                        icon={cta.settings.icon}
                        href={cta.content.link && !cta.settings.state.disabled ? cta.content.link[this.props.language] : ''}
                        target={cta.settings.state.external ? '_blank' : ''}
                        rel={cta.settings.state.external ? 'noopener' : ''}
                        className={cta.settings.state.disabled ? 'disabled' : ''}
                        onClick={(e) => {
                            if (cta.settings.state.disabled) e.preventDefault();
                        }
                        }
                    >
                        {
                            cta.content.icon && cta.content.icon[this.props.language] ?
                                <i>{cta.content.icon[this.props.language]}</i>
                                : null
                        }
                        <p>

                            {cta.content.text ? cta.content.text[this.props.language] : ''}</p>
                    </CTA>)


            }
        </LinedCTA>)

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
                        : ['Title', 'Tagline', 'Content', 'Image', 'DupCTA'].map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                }
            </Container>
        );
    }
}


CardCTALinedUp.defaultProps = {};

CardCTALinedUp.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default CardCTALinedUp;
