import styled from 'styled-components';
import {ContainerCommon} from '../../styles/common.styled';
import {ImageContainerCommon} from "../../styles/common.styled";
import { device} from "../../styles/constants";
import { ContentCommon} from "../../styles/common.styled";
import {getFormatedColor, generateFontProperties, generateTextColor} from "../../utils/StyleGenerator";

export const Container = styled(ContainerCommon).attrs(props => ({
    disabledLink : props.disabledLink,
    contentBold : props.contentBold,
    contentBoldResponsive: props.contentBold ? props.contentBold.responsive : [],
    contentBoldTypography : props.contentBold ? props.contentBold.typography : {}
}))`
    cursor : ${props => props.disabledLink ? 'auto' : 'pointer'};
    overflow : visible;
    flex-direction : column;
    
    & ${ImageContainerCommon}{
        transition : transform 0.25s 0s cubic-bezier(0.32, 0.01, 0, 1);
         transform : scale(1, 1);
    }   
    &:hover ${ImageContainerCommon}{
        transform :  ${props => props.disabledLink ? 'scale(1.0, 1.0)' : 'scale(1.1, 1.1)'} ;
    }
    
    ${ props =>  props.contentBold ? props.contentBoldResponsive.map(size => `
         @media ${ device[size] } {
            
            & ${ ContentCommon } b, & ${ ContentCommon } strong{
                ${props.contentBoldTypography ? generateTextColor(props.contentBoldTypography, size) : ''}
                ${ props.contentBoldTypography ?  generateFontProperties(props.contentBoldTypography, size) : '' }
            }
         }`) : ''
    }
    
`;
