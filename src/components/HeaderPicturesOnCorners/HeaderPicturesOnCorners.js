import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Container, Text, ImageCorner, Logo} from './styled';
import {getResponsiveKey} from '../../utils/functions';
import {generatePictureWebP} from "../../utils/gettersCommonElement";

class HeaderPicturesOnCorners extends Component {

    buildComponent = (fields, field, key) => {
        if (!fields[field]) return
        switch (field) {
            case 'Title':
                return <Text key={key}
                              responsive={fields[field].responsiveSettings}
                              typography={fields[field].settings.typography}
                              basis={fields[field].settings.basis}
                              border={fields[field].settings.border}
                              as={fields[field].settings.seo.tag || 'h2'}
                >
                    {fields[field].content.text[this.props.language]}
                </Text>;

            case 'CornerImages' :
                return this.getCornerImages(fields[field]);

            case 'Tagline' :
                return <Text key={key}
                                responsive={fields[field].responsiveSettings}
                                typography={fields[field].settings.typography}
                                basis={fields[field].settings.basis}
                                border={fields[field].settings.border}
                                as={fields[field].settings.seo.tag || 'h2'}
                >
                    {fields[field].content.text[this.props.language]}
                </Text>;

            case 'Image' :
                return <Logo key={key}
                             role={'img'}
                             alt={fields[field].content.images[0].alt[this.props.language]}
                             responsive={fields[field].responsiveSettings}
                             responsiveContent={getResponsiveKey(fields[field].content.images[0].asset)}
                             asset={fields[field].content.images[0].asset}
                             assetsDirectory={this.props.assetsDirectory}
                             basis={fields[field].settings.basis}/>;
            default :
                return null;
        }
    }

    getCornerImages = field => {
        const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
        return field.content.images.map((image, i) => {
            const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
            if (!file) return <ImageCorner key={i} responsive={field.responsiveSettings} basis={field.settings.basis} index={i+1}/>;

            return (
                <ImageCorner key={i} responsive={field.responsiveSettings} basis={field.settings.basis} index={i+1}>
                    { generatePictureWebP(`${this.props.assetsDirectory || ''}${ file }`, image.alt[this.props.language]) }
                </ImageCorner>);
        });
    }

    render() {
        const {fields, order} = this.props;

        const Template = fields.Template;

        return (
            <Container responsive={Template ? Template.responsiveSettings : []}
                       basis={Template && Template.settings ? Template.settings.basis : {}}>
                {
                    order ? ['CornerImages', ...order].map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                    : ['CornerImages', 'Image', 'Title', 'Tagline'].map((fieldName, i) => this.buildComponent(fields, fieldName, i))
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
