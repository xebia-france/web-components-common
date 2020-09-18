import React from 'react';
import {Container} from './styled';
import Text from '../../functional/Text'
import Content from '../../functional/Content'
import PropTypes from 'prop-types';
import {getTemplateProps} from "../../utils/gettersProperties";

const buildComponent = (fields, field,language, key) => {
    if (!fields[field]) return
    switch (field) {
        case 'Title':
            return <Text key={key} field={fields[field]} language={language}/>;

        case 'Tagline':
            return <Text key={key} field={fields[field]} language={language}/>;

        case 'Content':
            return <Content key={key} field={fields[field]} language={language}/>;

        default :
            return null;
    }
}

const BlockText = ({fields, order, language}) => {
    return (<Container {...getTemplateProps(fields.Template)}>
        {
            order ? order.map((fieldName, i) => buildComponent(fields, fieldName,language, i))
                : ['Title', 'Tagline', 'Content'].map((fieldName, i) => buildComponent(fields, fieldName,language, i))
        }
    </Container>)
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
