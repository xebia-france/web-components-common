import styled from "styled-components";
import {device} from "../../styles/constants";
import {isNumber} from "../../utils/functions";
import {
    generateSize,
    generatePadding,
    generateMargin,
    generateFontProperties,
    generateBorder, getFormatedColor, generateBackground, generateBorderColor, generateTextColor
} from "../../utils/StyleGenerator";

export const Container = styled.div`
  width : 100%;
  transition : all .2s cubic-bezier(.25,.46,.45,.94) 0ms;
`;

export const Link = styled.a.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    typography: props.typography,
    border: props.border
}))`
    transition : all 0.25s ease;
    border-style : solid;
    display : flex;
    align-items: center;
    z-index : 2;
    white-space: nowrap
  
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${props.basis ? generateBackground(props.basis, size, 'basic') : ''}            
            ${ props.basis ? generateSize(props.basis, size) : '' }  
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
            ${ props.typography ? generateFontProperties(props.typography, size) : '' } 
            ${ props.border ? generateBorder(props.border, size) : '' } 
            ${ props.border ? generateBorderColor(props.border, size, 'basic') : '' } 
            
            align-self:${ props.basis[size].alignment.horizontal || '' };
            justify-content:${ props.basis[size].alignment.horizontal || '' };
            ${props.typography ? generateTextColor(props.typography, size, 'basic') : ''}
            
            &:not(.disabledHover):hover{
                ${props.basis ? generateBackground(props.basis, size, 'hover') : ''}     
                ${ props.border ? generateBorderColor(props.border, size, 'hover') : '' }   
                ${props.typography ? generateTextColor(props.typography, size, 'hover') : ''}    
            }
            
            &.selected{
                ${props.basis ? generateBackground(props.basis, size, 'active') : ''}     
                ${ props.border ? generateBorderColor(props.border, size, 'active') : '' }   
                ${props.typography ? generateTextColor(props.typography, size, 'active') : ''} 
            }
         }`)
    };
    
`;

export const Bullet = styled.span.attrs(props => ({
    responsive: props.responsive,
    typography: props.typography
}))`
    position : absolute;
    right : 0;
  
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.typography ? generateFontProperties(props.typography, size) : '' } 
            ${props.typography ? generateTextColor(props.typography, size, 'basic') : ''} 
         }`)
    };
`;

export const Links = styled.ul`
  display : flex;
  flex-wrap : no-wrap;
  transition : height .2s cubic-bezier(.25,.46,.45,.94) 0ms;
  margin: auto;
  
  & li{
    display : flex;
    align-items : center;
    flex-direction : column;
    position : relative;
    height : 100%;
    justify-content : center;
    position: relative;
    
    &>div{
        position : absolute;
        top : 100%;
        width : 100%;
        overflow : hidden;
        
        & li{
            height : 0px;
            transition : height .2s cubic-bezier(.25,.46,.45,.94) 0ms;
            position : relative;
        }
    }
    
     &:hover{
        &>div{
         height : auto; 
        }
     }
  }
  
  @media  ${ device.M } {
    flex-direction : column;
    
    & ${Bullet}{
        display : none;
    }
  }
`;

export const FooterContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
  display : flex;
  flex-direction : row;
  width : 100%;
  transition : all .3s cubic-bezier(.25,.46,.45,.94) 0ms;

   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
         
            ${ props.basis ? generateSize(props.basis, size) : '' }
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' }  
            ${props.basis ? generateBackground(props.basis, size) : ''} 
            
            ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background:${ props.basis[size].color.gradient  };

               ` : ''}
            & ${Links}{
                & li{
                    &>div{
                       ${props.basis ? generateBackground(props.basis, size) : ''} 
                    ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                      background-color: transparent;
    
                   ` : ''}
                    }
                    &:hover{
                        &>div li{
                            height:${ isNumber(props.basis[size].size.height)
                                ? `${ props.basis[size].size.height }px`
                                : props.basis[size].size.height };
                        }
                    }
                }
            }
         }`)
};
   
`;