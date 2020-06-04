import styled from "styled-components";
import {device} from "../../styles/constants";
import {isNumber} from "../../utils/functions";
import isEmpty from "lodash/isEmpty";
import {
    generateSize,
    generatePadding,
    generateMargin,
    generateFontProperties,
    generateBorder,
    getFormatedColor
} from "../../utils/StyleGenerator";

export const Container = styled.div`
  width : 100%;
  transition : all .2s cubic-bezier(.25,.46,.45,.94) 0ms;
`;

export const Locale = styled.div`
  display : flex;
  
  & a{
    color: white;
  }  
  
  &>div{
    width : 100%;
    min-width : 45px;
    
    & a{
        display : block;
        width : 100%;
        height : 100%;
        text-align : center;
        padding : 10px;
        
        &.selected{
          background : rgba(255,255,255,0.2);
        }
    }
  }
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
    cursor : pointer;
  
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            background-color:${getFormatedColor(props.basis[size].color.basic, props.basis[size].opacity.basic) };

            ${ props.basis ? generateSize(props.basis, size) : '' }       
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
            ${ props.typography ? generateFontProperties(props.typography, size) : '' }
            ${ props.border ?  generateBorder(props.border, size) : '' } 
            ${ props.border ?
                ( props.border[size].color.basic ? `border-color : ${ getFormatedColor(props.border[size].color.basic, props.border[size].opacity.basic ) }; ` : '' )
            : ''} 
           
            align-self:${ props.basis[size].alignment.horizontal || '' };
            color:${ getFormatedColor( props.typography[size].color.basic, props.typography[size].opacity.basic )};
                        
            &:hover{
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

export const Links = styled.ul`
  display : flex;
  flex-wrap : no-wrap;
  transition : height .2s cubic-bezier(.25,.46,.45,.94) 0ms;
 
  & li{
    display : flex;
    align-items : center;
    flex-direction : column;
    position : relative;
    height : 100%;
    justify-content : center;
    
    &>ul{
        position : absolute;
        top : 100%;
        width : 100%;
        overflow : hidden;
        
        & li{
            height : 0px;
            transition : height .2s cubic-bezier(.25,.46,.45,.94) 0ms;
        }
    }
    
     &:hover{
        &>ul{
         display : block;
         height : auto; 
        }
       
     }
  }
`;

export const Top = styled.div`
  display : flex;
  align-items : center;
  justify-content : space-between;
  & a{
    color: white;
  }  
`;

export const FixedContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
  display : flex;
  flex-direction : row;
  justify-content : space-between;
  position : fixed;
  width : 100%;
  z-index : 20;
  transition : all .3s cubic-bezier(.25,.46,.45,.94) 0ms;
  box-sizing : content-box;

   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             
            width:${ isNumber(props.basis[size].size.basic.width)
                    ? `${ props.basis[size].size.basic.width }px`
                    : props.basis[size].size.basic.width };
    
            height:${ isNumber(props.basis[size].size.basic.height)
                    ? `${ props.basis[size].size.basic.height }px`
                    : props.basis[size].size.basic.height };
            max-width: ${ isNumber(props.basis[size].size.basic.maxWidth)
                    ? `${ props.basis[size].size.basic.maxWidth }px`
                    : props.basis[size].size.basic.maxWidth || '' };
            max-height:${ isNumber(props.basis[size].size.basic.maxHeight)
                    ? `${ props.basis[size].size.basic.maxHeight }px`
                    :props.basis[size].size.basic.maxHeight || '' };
            min-width: ${ isNumber(props.basis[size].size.basic.minWidth)
                    ? `${ props.basis[size].size.basic.minWidth }px`
                    : props.basis[size].size.basic.minWidth || '' };
            min-height:${ isNumber(props.basis[size].size.basic.minHeight)
                    ? `${ props.basis[size].size.basic.minHeight }px`
                    : props.basis[size].size.basic.minHeight || '' };      
                                
            padding-top : ${ props.basis[size].padding.basic.top }px;
            padding-bottom : ${ props.basis[size].padding.basic.bottom }px;
            padding-left : ${ props.basis[size].padding.basic.left }px;
            padding-right : ${ props.basis[size].padding.basic.right }px;
             
            margin-top : ${ props.basis[size].margin.basic.top }px;
            margin-bottom : ${ props.basis[size].margin.basic.bottom }px;
            margin-left : ${ props.basis[size].margin.basic.left }px;
            margin-right : ${ props.basis[size].margin.basic.right }px;
            
            background-color:${ props.basis[size].color.basic.rgb ?  `rgba(${props.basis[size].color.basic.rgb},${props.basis[size].opacity.basic.value})` : props.basis[size].color.basic.hex };

            & ${Top}{
               height:${ isNumber(props.basis[size].size.basic.height)
                    ? `${ props.basis[size].size.basic.height }px`
                    : props.basis[size].size.basic.height };
               min-height:${ isNumber(props.basis[size].size.basic.height)
                    ? `${ props.basis[size].size.basic.height }px`
                    : props.basis[size].size.basic.height };
            }
            
            & ${Links}{
                & li{
                    &>ul{
                       background-color:${ props.basis[size].color.basic.rgb ?  `rgba(${props.basis[size].color.basic.rgb},${props.basis[size].opacity.basic.value})` : props.basis[size].color.basic.hex };
                    }
                    &:hover{
                        &>ul li{
                         height:${ isNumber(props.basis[size].size.basic.height)
                                ? `${ props.basis[size].size.basic.height }px`
                                : props.basis[size].size.basic.height };
                        }
                     }
                  }
            }
            
            &.scrolled{
                width:${ isNumber(props.basis[size].size.scroll.width)
                    ? `${ props.basis[size].size.scroll.width }px`
                    : props.basis[size].size.scroll.width };
    
                height:${ isNumber(props.basis[size].size.scroll.height)
                        ? `${ props.basis[size].size.scroll.height }px`
                        : props.basis[size].size.scroll.height };
                max-width: ${ isNumber(props.basis[size].size.scroll.maxWidth)
                        ? `${ props.basis[size].size.scroll.maxWidth }px`
                        : props.basis[size].size.scroll.maxWidth || '' };
                max-height:${ isNumber(props.basis[size].size.scroll.maxHeight)
                        ? `${ props.basis[size].size.scroll.maxHeight }px`
                        :props.basis[size].size.scroll.maxHeight || '' };
                min-width: ${ isNumber(props.basis[size].size.scroll.minWidth)
                        ? `${ props.basis[size].size.scroll.minWidth }px`
                        : props.basis[size].size.scroll.minWidth || '' };
                min-height:${ isNumber(props.basis[size].size.scroll.minHeight)
                        ? `${ props.basis[size].size.scroll.minHeight }px`
                        : props.basis[size].size.scroll.minHeight || '' };      
                                    
                padding-top : ${ props.basis[size].padding.scroll.top }px;
                padding-bottom : ${ props.basis[size].padding.scroll.bottom }px;
                padding-left : ${ props.basis[size].padding.scroll.left }px;
                padding-right : ${ props.basis[size].padding.scroll.right }px;
                 
                margin-top : ${ props.basis[size].margin.scroll.top }px;
                margin-bottom : ${ props.basis[size].margin.scroll.bottom }px;
                margin-left : ${ props.basis[size].margin.scroll.left }px;
                margin-right : ${ props.basis[size].margin.scroll.right }px;
                
                background-color:${ props.basis[size].color.scroll.rgb ?  `rgba(${props.basis[size].color.scroll.rgb},${props.basis[size].opacity.scroll.value})` : props.basis[size].color.scroll.hex };
    
                & ${Links}{
                    & li{
                        &>ul{
                           background-color:${ props.basis[size].color.scroll.rgb ?  `rgba(${props.basis[size].color.scroll.rgb},${props.basis[size].opacity.scroll.value})` : props.basis[size].color.scroll.hex };
                        }
                        &:hover{
                            &>ul li{
                             height:${ isNumber(props.basis[size].size.scroll.height)
                                    ? `${ props.basis[size].size.scroll.height }px`
                                    : props.basis[size].size.scroll.height };
                            }
                         }
                      }
                }
            }
         }`)
};

    @media  ${ device.M } {
             flex-direction : column;   
             overflow : hidden;
             
             &.open{
                height : 100vh; 
                
                 & ${Links}{
                    display : flex;
                    height : 100%;
                 }
             }
             
             & ${Links}{
                flex-direction : column; 
                height : 0;
                //position : relative;
                display none;
                & li{
                    height : auto;
                    
                    &>ul{
                        position : initial;
                        //display : block;
                        
                        
                        &>li{
                            padding-left : 20px;
                        }
                    }
                }
                
                & ${ Locale}{
                    position : absolute;
                    bottom : 0;
                    width : 100%;
                    
                    &>a{
                        width : 100%;
                    }
                }
             }
     }
`;

export const LineWrapper = styled.div`
  width : 30px;
  
  &>div{
    width : 30px;
    height : 2px;
    outline : 1px solid transparent;
    display : block;
    transform-origin : 50% 50%;
    background : white;
    position: relative;
    transform : translateY(0);
    transition : transform .2s cubic-bezier(.25,.46,.45,.94) 0ms;
    
    &:nth-child(2), &:nth-child(3){
        margin-top : 6px;
    }
  }
`;

export const Hamburger = styled.label`
      display: none;
      height: 50px;
      width: 50px;
      cursor: pointer;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index : 5;
      
      @media  ${ device.M } {
        display : flex;
        align-items : center;
      }
      
      &:hover{
          & ${LineWrapper}{
                &>div:nth-child(1){
                    transform : translateY(-4px);
                }
               
                &>div:nth-child(3){
                    transform :translateY(4px)
                }
             }
      }
      
      &.open{        
         & ${LineWrapper}{
            &>div:nth-child(1){
                transform : translateY(8px) rotate(45deg);
            }
            &>div:nth-child(2){
                transform : rotate(45deg);
            }
            &>div:nth-child(3){
                transform :translateY(-8px) rotate(-45deg);
            }
         }
         
         
          &:hover{
      
              & ${LineWrapper}{
                    &>div:nth-child(1){
                        transform : translateY(8px);
                    }
                    &>div:nth-child(2){
                        transform : rotate(0deg);
                    }
                    &>div:nth-child(3){
                        transform :translateY(-8px)
                    }
                
                 }
          }
      }  
`;


export const ImageContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`

    overflow : hidden;
    border-style : solid;
    z-index : 2;
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.basis ? generateSize(props.basis, size) : '' }      
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
                    
            align-self:${ props.basis[size].alignment.horizontal || '' };
               
        &>img{
            ${  isEmpty(props.basis[size].size.width) ? `
                width : auto;
                height : 100%;    
            
            
            ` : ( !isEmpty(props.basis[size].size.width) && !isEmpty(props.basis[size].size.height) ? `
                width : 100%;
                height : 100%;
            ` : `
                width : 100%;
                height : auto;
            `)   }
        } 
    }   
   `) };  
`;

