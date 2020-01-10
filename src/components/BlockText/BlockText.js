import React, {Component} from 'react';
import {Container, Text, Content} from './styled';
import PropTypes from 'prop-types';

class BlockText extends Component {
    buildComponent = (fields, field, key) => {
        if (!fields[field]) return
        switch (field) {
            case 'Title':
                return <Text
                    key={key}
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    basis={fields[field].settings.basis}
                    as={fields[field].settings.seo.tag || 'h2'}

                >
                    {fields[field].content.text ? fields[field].content.text[this.props.language] : ''}
                </Text>;

            case 'Tagline':
                return <Text
                    key={key}
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    basis={fields[field].settings.basis}
                    as={fields[field].settings.seo.tag || 'h2'}

                >
                    {fields[field].content.text ? fields[field].content.text[this.props.language] : ''}
                </Text>;

            case 'Content':
                return <Content
                    key={key}
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    basis={fields[field].settings.basis}
                    dangerouslySetInnerHTML={{
                        __html: fields[field].content.html ? fields[field].content.html[this.props.language] : <p></p>
                    }}
                />

            default :
                return null;
        }
    }

    render() {
        const {fields, order} = this.props;

        const Template = fields.Template;

        return (
            <Container responsive={Template ? Template.responsiveSettings : []}
                       basis={Template && Template.settings ? Template.settings.basis : {}}
            >
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
