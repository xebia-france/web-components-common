import styled from "styled-components";
import {device} from "../../styles/constants";
import {isNumber} from "../../utils/functions";
import isEmpty from "lodash/isEmpty";

export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
  width : 100%;
  transition : all .2s cubic-bezier(.25,.46,.45,.94) 0ms;

  ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
          /* height:${ isNumber(props.basis[size].size.height)
                    ? `${ props.basis[size].size.height }px`
                    : props.basis[size].size.height };
                    
          */        
         }`)
};
  
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
             background-color:${ props.basis[size].color.basic.rgb ?  `rgba(${props.basis[size].color.basic.rgb},${props.basis[size].opacity.basic.value})` : props.basis[size].color.basic.hex };

             width:${ isNumber(props.basis[size].size.width)
    ? `${ props.basis[size].size.width }px`
    : props.basis[size].size.width };
    
            height:${ isNumber(props.basis[size].size.height)
    ? `${ props.basis[size].size.height }px`
    : props.basis[size].size.height };
            max-width: ${ isNumber(props.basis[size].size.maxWidth)
    ? `${ props.basis[size].size.maxWidth }px`
    : props.basis[size].size.maxWidth || '' };
            max-height:${ isNumber(props.basis[size].size.maxHeight)
    ? `${ props.basis[size].size.maxHeight }px`
    :props.basis[size].size.maxHeight || '' };
         
            align-self:${ props.basis[size].alignment.horizontal || '' };
            
            padding-top : ${ props.basis[size].padding.top }px;
            padding-bottom : ${ props.basis[size].padding.bottom }px;
            padding-left : ${ props.basis[size].padding.left }px;
            padding-right : ${ props.basis[size].padding.right }px;
            
             
            margin-top : ${ props.basis[size].margin.top }px;
            margin-bottom : ${ props.basis[size].margin.bottom }px;
            margin-left : ${ props.basis[size].margin.left }px;
            margin-right : ${ props.basis[size].margin.right }px;
            
            color:${ props.typography[size].color.basic.rgb ? `rgba(${props.typography[size].color.basic.rgb},${props.typography[size].opacity.basic.value})` : props.typography[size].color.basic.hex};
            font-size:${ props.typography[size].font.size }px;
            font-family : '${ props.typography[size].font.family }', ${props.typography[size].font.typeface };
            font-style: ${ props.typography[size].font.style || '' };
            font-weight: ${ props.typography[size].font.weight ? props.typography[size].font.weight[1] : '' } ;
            letter-spacing: ${ props.typography[size].font.letterSpacing }px;
            line-height: ${ props.typography[size].font.lineHeight }px;
            text-align: ${ props.typography[size].text.align };
            text-decoration: ${ props.typography[size].text.decoration || '' };
            text-transform: ${props.typography[size].text.transform || '' }; 
        
            border-color : ${ props.border[size].color.basic.rgb ? `rgba(${props.border[size].color.basic.rgb},${props.border[size].opacity.basic.value})` : props.border[size].color.basic.hex };     
            border-top-width : ${  isNumber(props.border[size].width.top) ? `${ props.border[size].width.top }px`
    : `${ props.border[size].width.top }` || '' }; 
            border-right-width : ${  isNumber(props.border[size].width.right) ? `${ props.border[size].width.right }px`
    : `${ props.border[size].width.right }` || '' }; 
            border-bottom-width : ${  isNumber(props.border[size].width.bottom) ? `${ props.border[size].width.bottom }px`
    : `${ props.border[size].width.bottom }` || '' }; 
            border-left-width : ${  isNumber(props.border[size].width.left) ? `${ props.border[size].width.left }px`
    : `${ props.border[size].width.left }` || '' }; 
            
            border-top-left-radius :  ${  isNumber(props.border[size].radius.topLeft) ? `${ props.border[size].radius.topLeft }px`
    : `${ props.border[size].radius.topLeft }` || '' };
            border-top-right-radius :  ${  isNumber(props.border[size].radius.topRight) ? `${ props.border[size].radius.topRight }px`
    : `${ props.border[size].radius.topRight }` || '' };  
            border-bottom-right-radius :  ${  isNumber(props.border[size].radius.bottomRight) ? `${ props.border[size].radius.bottomRight }px`
    : `${ props.border[size].radius.bottomRight }` || '' }; 
            border-bottom-left-radius :  ${  isNumber(props.border[size].radius.bottomLeft) ? `${ props.border[size].radius.bottomLeft }px`
    : `${ props.border[size].radius.bottomLeft }` || '' };                         
        
         
            &:not(.disabledHover):hover{
               background-color:${ props.basis[size].color.hover.rgb ?  `rgba(${props.basis[size].color.hover.rgb},${props.basis[size].opacity.hover.value})` : props.basis[size].color.hover.hex };

               border-color : ${ props.border[size].color.hover.rgb ? `rgba(${props.border[size].color.hover.rgb},${props.border[size].opacity.hover.value})` : props.border[size].color.hover.hex };     
               
               color:${ props.typography[size].color.hover.rgb ? `rgba(${props.typography[size].color.hover.rgb},${props.typography[size].opacity.hover.value})` : props.typography[size].color.hover.hex }; 
            }
            
            
            &.selected{
                background-color:${ props.basis[size].color.active.rgb ?  `rgba(${props.basis[size].color.active.rgb},${props.basis[size].opacity.active.value})` : props.basis[size].color.active.hex };
                border-color : ${ props.border[size].color.active.rgb ? `rgba(${props.border[size].color.active.rgb},${props.border[size].opacity.active.value})` : props.border[size].color.active.hex };     
                color:${ props.typography[size].color.active.rgb ? `rgba(${props.typography[size].color.active.rgb},${props.typography[size].opacity.active.value})` : props.typography[size].color.active.hex }; 

                  
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
            
            color:${ props.typography[size].color.basic.rgb ? `rgba(${props.typography[size].color.basic.rgb},${props.typography[size].opacity.basic.value})` : props.typography[size].color.basic.hex};
            font-size:${ props.typography[size].font.size }px;
            font-family : '${ props.typography[size].font.family }', ${props.typography[size].font.typeface };
            font-style: ${ props.typography[size].font.style || '' };
            font-weight: ${ props.typography[size].font.weight ? props.typography[size].font.weight[1] : '' } ;
            letter-spacing: ${ props.typography[size].font.letterSpacing }px;
            line-height: ${ props.typography[size].font.lineHeight }px;
            text-align: ${ props.typography[size].text.align };
            text-decoration: ${ props.typography[size].text.decoration || '' };
            text-transform: ${props.typography[size].text.transform || '' }; 
        
         
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

export const FixedContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
  display : flex;
  flex-direction : row;
  width : 100%;
  transition : all .3s cubic-bezier(.25,.46,.45,.94) 0ms;

 
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             
            width:${ isNumber(props.basis[size].size.width)
                    ? `${ props.basis[size].size.width }px`
                    : props.basis[size].size.width };
    
            height:${ isNumber(props.basis[size].size.height)
                    ? `${ props.basis[size].size.height }px`
                    : props.basis[size].size.height };
            max-width: ${ isNumber(props.basis[size].size.maxWidth)
                    ? `${ props.basis[size].size.maxWidth }px`
                    : props.basis[size].size.maxWidth || '' };
            max-height:${ isNumber(props.basis[size].size.maxHeight)
                    ? `${ props.basis[size].size.maxHeight }px`
                    :props.basis[size].size.maxHeight || '' };
            min-width: ${ isNumber(props.basis[size].size.minWidth)
                    ? `${ props.basis[size].size.minWidth }px`
                    : props.basis[size].size.minWidth || '' };
            min-height:${ isNumber(props.basis[size].size.minHeight)
                    ? `${ props.basis[size].size.minHeight }px`
                    : props.basis[size].size.minHeight || '' };      
                                
            padding-top : ${ props.basis[size].padding.top }px;
            padding-bottom : ${ props.basis[size].padding.bottom }px;
            padding-left : ${ props.basis[size].padding.left }px;
            padding-right : ${ props.basis[size].padding.right }px;
             
            margin-top : ${ props.basis[size].margin.top }px;
            margin-bottom : ${ props.basis[size].margin.bottom }px;
            margin-left : ${ props.basis[size].margin.left }px;
            margin-right : ${ props.basis[size].margin.right }px;
            
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