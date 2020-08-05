import React, {Component} from 'react';
import {Container} from './styled';
import Text from '../../functional/Text';
import Content from '../../functional/Content';
import CTA from '../../functional/CTA'
import Image from "../../functional/Image";

import PropTypes from 'prop-types';
import {getTemplatePropsWithImage} from "../../utils/gettersProperties";

class Card extends Component {
    buildComponent = (fields, field, key) => {
        if (!fields[field]) return
        switch (field) {
            case 'Title':
                return <Text key={key} field={fields[field]} language={this.props.language}/>;

            case 'Tagline':
                return <Text key={key} field={fields[field]} language={this.props.language}/>;

            case 'Content':
                return <Content key={key} field={fields[field]} language={this.props.language}/>;

            case 'Image':
                return <Image key={key} field={fields[field]} language={this.props.language}
                              assetsDirectory={this.props.assetsDirectory}/>

            case 'CTA':
                return <CTA key={key} field={fields[field]} language={this.props.language}/>;
            default :
                return null;
        }
    }

    render() {
        const {fields, order, assetsDirectory} = this.props;
        return (
            <Container  {...getTemplatePropsWithImage(fields.Template)} assetsDirectory={assetsDirectory}>
                {
                    order ? order.map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                        : ['Title', 'Tagline', 'Content', 'Image', 'CTA'].map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                }
            </Container>
        );
    }
}


Card.defaultProps = {};

Card.propTypes = {
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
export default Card;
