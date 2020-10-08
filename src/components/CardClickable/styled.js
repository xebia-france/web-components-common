import styled from 'styled-components';
import {ContainerCommon, ContentCommon, ImageContainerCommon, TextCommon} from "../../styles/common.styled";
import { device} from "../../styles/constants";
import { getFormatedColor, generateFontProperties} from "../../utils/StyleGenerator";

export const ImageContainer = styled(ImageContainerCommon)`
`;

export const Container = styled(ContainerCommon).attrs(props => ({
    contentBold : props.contentBold,
    contentBoldResponsive: props.contentBold ? props.contentBold.responsive : [],
    contentBoldTypography : props.contentBold ? props.contentBold.typography : {}
}))`
    ${ props =>  props.contentBold ? props.contentBoldResponsive.map(size => `
         @media ${ device[size] } {
            
            & ${ ContentCommon } b, & ${ ContentCommon } strong{
                color:${ getFormatedColor(props.contentBoldTypography[size].color, props.contentBoldTypography[size].opacity) };
                ${ props.contentBoldTypography ?  generateFontProperties(props.contentBoldTypography, size) : '' }
            }
         }`) : ''
    }
    
     & ${ImageContainer} img {
         transition : transform 0.25s 0s cubic-bezier(0.32, 0.01, 0, 1);
     }
    
    &:hover{
        & ${ImageContainer} img{
            transform : scale(1.1);
        }
    }
`;

export const Text = styled(TextCommon)``;

export const Content = styled(ContentCommon)``;

