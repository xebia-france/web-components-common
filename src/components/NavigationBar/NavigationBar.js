import React, {Component} from 'react';
import {Container} from './styled';
import Text from '../../functional/Text';
import Content from '../../functional/Content';
import CTA from '../../functional/CTA'
import Image from "../../functional/Image";

import PropTypes from 'prop-types';
import {getTemplatePropsWithImage} from "../../utils/gettersProperties";

class NavigationBar extends Component {
    buildComponent = (fields, field, key) => {
        if (!fields[field]) return
        switch (field) {
            case 'Title' || 'Tagline':
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
            <div>navigation bar</div>
        );
    }
}


NavigationBar.defaultProps = {};

NavigationBar.propTypes = {};
export default NavigationBar;
