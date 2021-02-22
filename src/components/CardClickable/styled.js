import styled from 'styled-components';
import {ContainerCommon, ContentCommon} from "../../styles/common.styled";
import { device} from "../../styles/constants";
import {getFormatedColor, generateFontProperties, generateTextColor} from "../../utils/StyleGenerator";
import {ImageContainerCommon} from "../../styles/common.styled";

export const Container = styled(ContainerCommon).attrs(props => ({
    contentBold : props.contentBold,
    contentBoldResponsive: props.contentBold ? props.contentBold.responsive : [],
    contentBoldTypography : props.contentBold ? props.contentBold.typography : {}
}))`
    ${ props =>  props.contentBold ? props.contentBoldResponsive.map(size => `
         @media ${ device[size] } {
            
            & ${ ContentCommon } b, & ${ ContentCommon } strong{
                ${props.contentBoldTypography ? generateTextColor(props.contentBoldTypography, size) : ''}
                ${ props.contentBoldTypography ?  generateFontProperties(props.contentBoldTypography, size) : '' }
            }
         }`) : ''
    }
    
     & ${ImageContainerCommon} img {
         transition : transform 0.25s 0s cubic-bezier(0.32, 0.01, 0, 1);
     }
    
    &:hover{
        & ${ImageContainerCommon} img{
            transform : scale(1.1);
        }
    }
`;

