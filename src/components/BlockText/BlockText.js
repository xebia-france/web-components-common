import React, {Component} from 'react';
import {Container} from './styled';
import Text from '../../functional/Text'
import Content from '../../functional/Content'
import PropTypes from 'prop-types';
import {getTemplateProps} from "../../utils/gettersProperties";

class BlockText extends Component {
    buildComponent = (fields, field, key) => {
        if (!fields[field]) return
        switch (field) {
            case 'Title' || 'Tagline':
                return <Text key={key} field={fields[field]} language={this.props.language}/>;

            case 'Content':
                return <Content key={key} field={fields[field]} language={this.props.language}/>;

            default :
                return null;
        }
    }

    render() {
        const {fields, order} = this.props;
        return (
            <Container {...getTemplateProps(fields.Template)}>
                {
                    order ? order.map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                        : ['Title', 'Tagline', 'Content'].map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                }
            </Container>
        );
    }
}

BlockText.defaultProps = {};

BlockText.propTypes = {
    order: PropTypes.arrayOf(PropTypes.string),
    fields: PropTypes.shape({
        Template: PropTypes.object,
        Title: PropTypes.object,
        Tagline: PropTypes.object,
        Content: PropTypes.object
    }),
    language: PropTypes.number.isRequired
};

export default BlockText;
