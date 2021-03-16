import styled from 'styled-components';
import {ContainerCommon} from '../../styles/common.styled';
import { ContentCommon} from "../../styles/common.styled";
import { device} from "../../styles/constants";
import { generateFontProperties, generateTextColor} from "../../utils/StyleGenerator";

export const ContainerActive = styled(ContainerCommon).attrs(props => ({
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
    
    z-index : 5;
    display : flex;
    flex-direction: column;
    justify-content : center;
    
    height : inherit;
    
    &:before, &:after{
        transition : opacity .6s cubic-bezier(.25,.46,.45,.94) 300ms;
        opacity : 0;
    }
    
    &>*{
        transition : opacity .3s cubic-bezier(.25,.46,.45,.94) 0ms;
        opacity : 0;
    }

`;



export const ShortPresentation = styled.div.attrs(props => ({

}))`
    position :  absolute;
    width : 100%;
    height : 100%;
    display : flex;
    flex-direction: column;
    justify-content : flex-end;
    
    &>*{
        opacity : 1;
        transition : opacity .3s cubic-bezier(.25,.46,.45,.94) 300ms;

    }
    
    
`;

export const Container = styled(ContainerCommon).attrs(props => ({
    contentBold : props.contentBold,
    contentBoldResponsive: props.contentBold ? props.contentBold.responsive : [],
    contentBoldTypography : props.contentBold ? props.contentBold.typography : {},
    dynamicHeight : props.dynamicHeight
}))`
    ${ props =>  props.contentBold ? props.contentBoldResponsive.map(size => `
         @media ${ device[size] } {
            
            & ${ ContentCommon } b, & ${ ContentCommon } strong{
                ${props.contentBoldTypography ? generateTextColor(props.contentBoldTypography, size) : ''}
                ${ props.contentBoldTypography ?  generateFontProperties(props.contentBoldTypography, size) : '' }
            }
         }`) : ''
    }
    
    ${props =>  props.dynamicHeight !== 0 ? `height : ${props.dynamicHeight}px;` : ''}
    
    
    &:hover, &.active {
        & ${ContainerActive}{
            &:before, &:after{
                opacity : 1;
                transition : opacity .3s cubic-bezier(.25,.46,.45,.94) 300ms;
            }

            &>*{
                opacity : 1;
                transition : opacity .3s cubic-bezier(.25,.46,.45,.94) 600ms; 
            }
           
        }
        & ${ShortPresentation}{
            &>*{
                opacity : 0;
                transition : opacity .3s cubic-bezier(.25,.46,.45,.94) 0ms;

                
            }
        }
       
        
    }
`;

