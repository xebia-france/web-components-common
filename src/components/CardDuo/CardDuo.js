import React, {Component} from 'react';
import {Container, SubContainer, Card, PrevContainer, Text, Content, ImageContainer, CTA, Between} from './styled';
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";

class CardDuo extends Component {
    buildComponent = (fields, field, key, nbrCard) => {
        if (!fields[field]) return
        switch (field) {
            case `Title${nbrCard}`:
                return <Text
                    key={`${key}-${nbrCard}`}
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    basis={fields[field].settings.basis}
                    border={fields[field].settings.border}
                    as={fields[field].settings.seo.tag || 'h2'}
                >
                    {fields[field].content.text ? fields[field].content.text[this.props.language] : 'no text'}
                </Text>;

            case `Tagline${nbrCard}`:
                return <Text
                    key={`${key}-${nbrCard}`}
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    basis={fields[field].settings.basis}
                    border={fields[field].settings.border}
                    as={fields[field].settings.seo.tag || 'h2'}
                >
                    {fields[field].content.text ? fields[field].content.text[this.props.language] : 'no text'}
                </Text>;

            case `Content${nbrCard}` :
                return <Content
                    key={`${key}-${nbrCard}`}
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    basis={fields[field].settings.basis}
                    dangerouslySetInnerHTML={{
                        __html: fields[field].content.html ? fields[field].content.html[this.props.language] :
                            <p>no content</p>
                    }}
                />

            case `Image${nbrCard}` :
                return this.getImages(fields[field]);

            case `CTA${nbrCard}`:

                return <CTA
                    key={`${key}-${nbrCard}`}
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
        const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
        return field.content.images.map((image, i) => {
            const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
            if (!file) {
                return null
            } else {
                return (
                    <PrevContainer>
                        <ImageContainer key={i}
                                        responsive={field.responsiveSettings}
                                        basis={field.settings.basis}
                                        border={field.settings.border}>
                            <img alt={image.alt[this.props.language]}
                                 src={`${this.props.assetsDirectory || ''}${ file }`}/>
                        </ImageContainer>
                    </PrevContainer>);
            }

        });
    }

    render() {
        const {fields, order, assetsDirectory} = this.props;

        const Template = fields.Template;
        const Separator = fields.Separator;
        const Template2 = fields.Template2;

        return (
            <Container>
                <Card responsive={Template ? Template.responsiveSettings : []}
                      responsiveContent={getResponsiveKey(Template.content.images[0].asset)}
                      asset={Template.content.images[0].asset || null}
                      assetsDirectory={assetsDirectory}
                      basis={Template && Template.settings ? Template.settings.basis : null}
                      border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
                >

                    {
                        fields.Image ? this.getImages(fields.Image) : null
                    }
                    <SubContainer>
                        {
                            order && order[0] ? order[0].map((fieldName, i) => this.buildComponent(fields, fieldName, i, ''))
                                : ['Title', 'Tagline', 'Content', 'CTA'].map((fieldName, i) => this.buildComponent(fields, fieldName, i, ''))
                        }
                    </SubContainer>
                </Card>
                <Between responsive={Separator ? Separator.responsiveSettings : []}
                         responsiveContent={getResponsiveKey(Separator.content.images[0].asset)}
                         asset={Separator.content.images[0].asset || null}
                         basisParent={Template && Template.settings ? Template.settings.basis : {}}
                         assetsDirectory={assetsDirectory}
                         basis={Separator && Separator.settings ? Separator.settings.basis : {}}>
                    <div/>
                </Between>
                <Card responsive={Template2 ? Template2.responsiveSettings : []}
                      responsiveContent={getResponsiveKey(Template2.content.images[0].asset)}
                      asset={Template2.content.images[0].asset || null}
                      assetsDirectory={assetsDirectory}
                      basis={Template2 && Template2.settings ? Template2.settings.basis : null}
                      border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
                >
                    {
                        fields.Image2 ? this.getImages(fields.Image2) : null
                    }

                    <SubContainer>
                        {
                            order && order[1] ? order[1].map((fieldName, i) => this.buildComponent(fields, fieldName, i, '2'))
                                : ['Title2', 'Tagline2', 'Content2', 'CTA2'].map((fieldName, i) => this.buildComponent(fields, fieldName, i, '2'))
                        }
                    </SubContainer>
                </Card>
            </Container>
        );
    }
}


CardDuo.defaultProps = {};

CardDuo.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default CardDuo;
