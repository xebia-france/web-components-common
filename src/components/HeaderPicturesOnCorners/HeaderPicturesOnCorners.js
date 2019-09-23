import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Title, Tagline, ImageCorner, Logo } from './styled';
import { getResponsiveKey } from '../../utils/functions';

class HeaderPicturesOnCorners extends Component {

    buildComponent = (fields, field, key) => {
        switch (field) {
            case 'Title':
                return <Title key={key}
                              responsive={fields[field].responsiveSettings}
                              color={fields[field].settings.color}
                              font={fields[field].settings.font}
                              text={fields[field].settings.text}
                              opacity={fields[field].settings.opacity}
                              as={fields[field].settings.seo.tag || 'h2'}

                >
                    {fields[field].content.text[this.props.language]}
                </Title>;

            case 'CornerImages' :
                return this.getCornerImages(fields[field]);

            case 'Tagline' :
                return <Tagline key={key}
                                responsive={fields[field].responsiveSettings}
                                opacity={fields[field].settings.opacity}
                                color={fields[field].settings.color}
                                font={fields[field].settings.font}
                                text={fields[field].settings.text}
                                as={fields[field].settings.seo.tag || 'h2'}
                >
                    {fields[field].content.text[this.props.language]}
                </Tagline>;

            case 'Logo' :
                return <Logo key={key}
                             role={'img'}
                             alt={fields[field].content.images[0].alt[this.props.language]}
                             responsive={fields[field].responsiveSettings}
                             responsiveContent={getResponsiveKey(fields[field].content.images[0].asset)}
                             asset={fields[field].content.images[0].asset}
                             size={fields[field].settings.size}
                             padding={fields[field].settings.padding}/>;

            default :
                return null;
        }
    }

    getCornerImages = field => {
        const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
        return field.content.images.map((image, i) => {
            const file = image.asset[responsiveContent].fields.file;
            return (
                <ImageCorner key={i} responsive={field.responsiveSettings} size={field.settings.size}>
                    <img alt={image.alt[this.props.language]} src={`https:${ file[Object.keys(file)[0]].url }`}/>
                </ImageCorner>);
        });
    }

    render () {
        const { fields } = this.props;

        const Template = fields.Template;

        return (
            <Container responsive={Template.responsiveSettings}
                       color={Template ? Template.settings.color : ''}>
                {
                    ['CornerImages', 'Logo', 'Title', 'Tagline'].map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                }
            </Container>
        );
    }
};

HeaderPicturesOnCorners.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default HeaderPicturesOnCorners;
