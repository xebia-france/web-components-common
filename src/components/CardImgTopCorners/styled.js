import styled from 'styled-components';
import {ContainerCommon} from '../../styles/common.styled';
import { ContentCommon} from "../../styles/common.styled";
import { device} from "../../styles/constants";
import { getFormatedColor, generateFontProperties} from "../../utils/StyleGenerator";

export const Container = styled(ContainerCommon).attrs(props => ({
    contentBold : props.contentBold,
    contentBoldResponsive: props.contentBold ? props.contentBold.responsive : [],
    contentBoldTypography : props.contentBold ? props.contentBold.typography : {}
}))`
    & div.onTopLeft{
        position: absolute;
        top : 0;
        left : 0;
    }
    
    & div.onTopRight{
        position: absolute;
        top : 0;
        right : 0;
    }
    
    ${ props =>  props.contentBold ? props.contentBoldResponsive.map(size => `
         @media ${ device[size] } {
            
            & ${ ContentCommon } b, & ${ ContentCommon } strong{
                color:${ getFormatedColor(props.contentBoldTypography[size].color, props.contentBoldTypography[size].opacity) };
                ${ props.contentBoldTypography ?  generateFontProperties(props.contentBoldTypography, size) : '' }
            }
         }`) : ''
    }
    
    @media ${ device.M } {
        & ${ ContentCommon }{
            display : none;
        }
    }
    
`;
