import styled from 'styled-components';
import {ContainerCommon} from '../../styles/common.styled';
import { ContentCommon} from "../../styles/common.styled";
import { device} from "../../styles/constants";
import { generateFontProperties, generateTextColor} from "../../utils/StyleGenerator";

export const Container = styled(ContainerCommon).attrs(props => ({
    contentBold : props.contentBold,
    contentBoldResponsive: props.contentBold ? props.contentBold.responsive : [],
    contentBoldTypography : props.contentBold ? props.contentBold.typography : {}
}))`

    flex-direction : row;
    justify-content :center;
    align-items :center;
    
    ${ props =>  props.contentBold ? props.contentBoldResponsive.map(size => `
         @media ${ device[size] } {
            
            
            & ${ ContentCommon } b, & ${ ContentCommon } strong{
                ${props.contentBoldTypography ? generateTextColor(props.contentBoldTypography, size) : ''}
                ${ props.contentBoldTypography ?  generateFontProperties(props.contentBoldTypography, size) : '' }
            }
         }`) : ''
    }
`;
export const Separator = styled(ContainerCommon)`
    z-index : 3;
    
  
`;

export const Box = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
`;
