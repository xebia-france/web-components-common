import styled from "styled-components";
import {device} from "../../styles/constants";
import {isNumber} from "../../utils/functions";
import {
    generateSize,
    generatePadding,
    generateMargin,
    generateFontProperties,
    generateBorder, getFormatedColor
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
  
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
             background-color:${getFormatedColor(props.basis[size].color.basic, props.basis[size].opacity.basic) };
            
            ${ props.basis ? generateSize(props.basis, size) : '' }  
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
            ${ props.typography ? generateFontProperties(props.typography, size) : '' } 
            ${ props.border ? generateBorder(props.border, size) : '' } 
            ${ props.border ?
                ( props.border[size].color.basic ? `border-color : ${ getFormatedColor(props.border[size].color.basic, props.border[size].opacity.basic ) }; ` : '' )
            : ''} 
            
            
            align-self:${ props.basis[size].alignment.horizontal || '' };
            justify-content:${ props.basis[size].alignment.horizontal || '' };
            color:${ getFormatedColor( props.typography[size].color.basic, props.typography[size].opacity.basic )};
            
            &:not(.disabledHover):hover{
                background-color:${ getFormatedColor( props.basis[size].color.hover, props.basis[size].opacity.hover)};
                border-color : ${ getFormatedColor(props.border[size].color.hover, props.border[size].opacity.hover)};
                color:${ getFormatedColor(props.typography[size].color.hover, props.typography[size].opacity.hover )};
            }
            
            &.selected{
                background-color:${ getFormatedColor( props.basis[size].color.active, props.basis[size].opacity.active)};
                border-color : ${ getFormatedColor(props.border[size].color.active, props.border[size].opacity.active)};
                color:${ getFormatedColor(props.typography[size].color.active, props.typography[size].opacity.active )};
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
            color:${ getFormatedColor( props.typography[size].color.basic, props.typography[size].opacity.basic )};            
         }`)
    };
`;

export const Links = styled.div`
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
            
            background-color:${ props.basis[size].color.rgb ?  `rgba(${props.basis[size].color.rgb},${props.basis[size].opacity.value})` : props.basis[size].color.hex };

            & ${Links}{
                & li{
                    &>div{
                       background-color:${ props.basis[size].color.rgb ?  `rgba(${props.basis[size].color.rgb},${props.basis[size].opacity.value})` : props.basis[size].color.hex };
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