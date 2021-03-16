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
    position : absolute;
    top : 0;
    left : 0;
    
  /*  &:before, &:after{
        transition : opacity .4s cubic-bezier(.25,.46,.45,.94) 200ms;
        opacity : 0;
    }
    
    &>*{
        transition : opacity .2s cubic-bezier(.25,.46,.45,.94) 0ms;
        opacity : 0;
    }*/

`;



export const ShortPresentation = styled.div.attrs(props => ({

}))`
    position :  absolute;
    width : 100%;
    height : 100%;
    display : flex;
    flex-direction: column;
    justify-content : flex-end;
    top : 0;
    left : 0;
    transition : top .2s cubic-bezier(.25,.46,.45,.94) 0ms;
    
   /*&>*{
        opacity : 1;
        transition : opacity .2s cubic-bezier(.25,.46,.45,.94) 200ms;

    }*/
    
    
`;

export const Container = styled(ContainerCommon).attrs(props => ({
    contentBold : props.contentBold,
    contentBoldResponsive: props.contentBold ? props.contentBold.responsive : [],
    contentBoldTypography : props.contentBold ? props.contentBold.typography : {},
    dynamicHeight : props.dynamicHeight,
    fadeAnimation : props.fadeAnimation
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
    
    ${props => props.fadeAnimation ?
    `
        &:not(.active){
            & ${ContainerActive}{
                &:before, &:after{
                    transition : opacity .4s cubic-bezier(.25,.46,.45,.94) 200ms;
                    opacity : 0;
                }
    
                &>*{
                    transition : opacity .2s cubic-bezier(.25,.46,.45,.94) 0ms;
                    opacity : 0; 
                }
               
            }
            & ${ShortPresentation}{
                &>*{
                    opacity : 1;
                    transition : opacity .2s cubic-bezier(.25,.46,.45,.94) 200ms;
                }
            }
        }
        
        &:hover, &.active,  &:hover:not(.active) {
            & ${ContainerActive}{
                &:before, &:after{
                    opacity : 1;
                    transition : opacity .2s cubic-bezier(.25,.46,.45,.94) 100ms;
                }
    
                &>*{
                    opacity : 1;
                    transition : opacity .2s cubic-bezier(.25,.46,.45,.94) 250ms; 
                }
               
            }
            & ${ShortPresentation}{
                top : -30%;
                &>*{
                    opacity : 0;
                    transition : opacity .2s cubic-bezier(.25,.46,.45,.94) 0ms;
    
                    
                }
            }
        }
    `
 : ''}
      
`;

