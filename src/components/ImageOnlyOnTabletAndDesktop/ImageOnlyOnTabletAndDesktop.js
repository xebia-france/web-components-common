import React from 'react';
import {Container} from './styled';
import Image from "../../functional/Image";
import {useWindowSize} from '../../utils/customHooks';

import PropTypes from 'prop-types';
import {getTemplatePropsWithImage} from "../../utils/gettersProperties";


const buildComponent = (fields, field, language, assetsDirectory, key) => {
    if (!fields[field]) return
    switch (field) {
        case 'Image':
            return <Image key={key} field={fields[field]} language={language}
                          assetsDirectory={assetsDirectory}/>
        default :
            return null;
    }
}

const ImageOnlyOnTabletAndDesktop = ({fields, order, assetsDirectory, language}) => {

    const size = useWindowSize();

    if (size.width === undefined || size.width <= 767) return null

    return (
        <Container  {...getTemplatePropsWithImage(fields.Template)}
                    assetsDirectory={assetsDirectory}>
            {
                order ? order.map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                    : ['Image'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
            }
        </Container>
    );
}


ImageOnlyOnTabletAndDesktop.defaultProps = {};

ImageOnlyOnTabletAndDesktop.propTypes = {
    order: PropTypes.arrayOf(PropTypes.string),
    fields: PropTypes.shape({
        Template: PropTypes.object,
        Image: PropTypes.object
    }),
    language: PropTypes.number.isRequired,
    assetsDirectory: PropTypes.string
};
export default ImageOnlyOnTabletAndDesktop;
