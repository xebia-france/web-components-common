import styled from "styled-components";
import {device} from "../../styles/constants";
import {isNumber} from "../../utils/functions";
import {generateSize,generatePadding, generateMargin, getFormatedColor} from "../../utils/StyleGenerator";

export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
  width : 100%;
  transition : all .2s cubic-bezier(.25,.46,.45,.94) 0ms;
  z-index : 50;
`;


export const BubbleContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    svg: props.svg
}))`
    display : flex;
    position :absolute;
    width : 24px;
    height : 100%;
    ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
         
            ${ props.svg ? `
                ${ generateSize(props.svg, size) }
                & svg { 
                    &   path{
                    fill: ${ getFormatedColor(props.svg[size].fill, props.svg[size].opacityFill) } !important;
                    }
                }
            ` : `
               width : 24px;
                
            ` } 
         }`
    )};
    
  &>svg{
    width : 100%;
  }  
`;



export const CheckContainer = styled.div`
  display : flex;
  width : 40px;
  height : 40px;
  
  &>svg{
    width : 0px;
    height : 40px;
    transition : width 0.3s ease;
  } 
  
  &.selected{
      &>svg{
        width : 40px;
      } 
  }
  
  @media  ${ device.M },  ${ device.T } {
    &>svg{
        height : 100%;
    }
    &.selected{
      &>svg{
        width : 100%;
      } 
    }
  }
`;

export const ArrowContainer = styled.div`
  display : none;
  width : 50px;
  height : 50px;
  transform : rotate(180deg);
  cursor : pointer;
  
  &>svg{
    width : 100%;
  } 
  
  @media  ${ device.M }, ${ device.T } {
    display : flex;
  }
   
`;

export const Link = styled.a.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    typography: props.typography,
    border: props.border
}))`
    transition : color 0.25s ease, border-color 0.25s ease;
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
        
        
        
        
            & ${CheckContainer}, & ${ArrowContainer}{
                & svg polyline{
                    stroke :${ props.typography[size].color.basic.rgb ? `rgba(${props.typography[size].color.basic.rgb},${props.typography[size].opacity.basic.value})` : props.typography[size].color.basic.hex} !important;

                }
            }
            
         
            &:hover{
               background-color:${ props.basis[size].color.hover.rgb ?  `rgba(${props.basis[size].color.hover.rgb},${props.basis[size].opacity.hover.value})` : props.basis[size].color.hover.hex };

               border-color : ${ props.border[size].color.hover.rgb ? `rgba(${props.border[size].color.hover.rgb},${props.border[size].opacity.hover.value})` : props.border[size].color.hover.hex };     
               
               color:${ props.typography[size].color.hover.rgb ? `rgba(${props.typography[size].color.hover.rgb},${props.typography[size].opacity.hover.value})` : props.typography[size].color.hover.hex }; 
            }
            
            
            
            
            &.selected{
                background-color:${ props.basis[size].color.active.rgb ?  `rgba(${props.basis[size].color.active.rgb},${props.basis[size].opacity.active.value})` : props.basis[size].color.active.hex };
                border-color : ${ props.border[size].color.active.rgb ? `rgba(${props.border[size].color.active.rgb},${props.border[size].opacity.active.value})` : props.border[size].color.active.hex };     
                color:${ props.typography[size].color.active.rgb ? `rgba(${props.typography[size].color.active.rgb},${props.typography[size].opacity.active.value})` : props.typography[size].color.active.hex }; 

                & ${CheckContainer}, & ${ArrowContainer}{
                    & svg polyline{
                        stroke :${ props.typography[size].color.active.rgb ? `rgba(${props.typography[size].color.active.rgb},${props.typography[size].opacity.active.value})` : props.typography[size].color.active.hex} !important;
    
                    }
                }
            
                  
            }
            
            
            & ${CheckContainer}, & ${ArrowContainer}{
                & svg polyline{
                    stroke :${ props.typography[size].color.basic.rgb ? `rgba(${props.typography[size].color.basic.rgb},${props.typography[size].opacity.basic.value})` : props.typography[size].color.basic.hex} !important;

                }
            }
            
            
            
         
         }`)
    };
    
`;


export const LinkLanguage = styled.a.attrs(props => ({
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
            
           // color:${ props.typography[size].color.basic.rgb ? `rgba(${props.typography[size].color.basic.rgb},${props.typography[size].opacity.basic.value})` : props.typography[size].color.basic.hex};
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
        
        
         }`)
    };
    
`;

export const Links = styled.div`
  /*display : flex;
  flex-wrap : no-wrap;
  transition : height .2s cubic-bezier(.25,.46,.45,.94) 0ms;
  
  
    &>div{
        display : flex;
    }
  
  
  @media  ${ device.M },  ${ device.T } {
    &>div{
        flex-direction : column;
    }
  }
 
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
            
            & a{
                width : 100%;
            }
        }
    }
    
    &:hover{
        &>ul{
         display : block;
         height : auto; 
        }
       
    }
  }
  */
`;



export const LanguageSelector = styled.ul`
  position : absolute;
  top : 100%;
  right : 0;
  overflow : hidden;
  
  
  & ${Link}{
        display : flex;
        width : 100%;
        height : 0px;
        text-align : center;
        padding :0 0 0 20px;
        transition : height .2s cubic-bezier(.25,.46,.45,.94) 0ms;    
        justify-content : space-between;
  }
  
   @media  ${ device.M },  ${ device.T } {
    position : initial;
    width : 100%;
    display : flex;
    background-color : transparent !important;
    
    & ${Link}{
      // height : 50px; 
       background-color : transparent;
    }
   }
`;



export const Locale = styled.div`
  display : flex;
  position: relative;
  margin-left : 20px;
  
  &:not(:hover){
    & ${LanguageSelector} ${Link}{
        border-width : 0px;
    }
  }
  
  @media  ${ device.M } , ${ device.T } {
    margin-left : 0;
  }
`;


export const CurrentLocale = styled.div.attrs(props => ({
    responsive: props.responsive,
    svg: props.svg
}))`
  display : flex;
  position: relative;
  align-items : center;
  justify-content : center;
  cursor : pointer;
 
    ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             ${ props.svg ? 
                generateSize(props.svg, size) :
            `width : 24px;`}
            
            ${ props.svg ? `
                 &>${LinkLanguage}{
                    color: ${ getFormatedColor(props.svg[size].color, props.svg[size].opacity) } !important;
                    
                    &:hover{
                        color: ${ getFormatedColor(props.svg[size].color, props.svg[size].opacity) } !important;
                    }
                }
            ` : '' } 
         }`
    )};
  
  &>${LinkLanguage}{
    z-index : 2;
    //font-size : 12px;
    background-color : transparent;
    
    &:hover{
        background-color : transparent;
    }
  }
  & ${BubbleContainer}{
    z-index : 1;
  }
  
  @media  ${ device.M },  ${ device.T } {
    display : none;
  }
  
`;




export const Top = styled.div`
`;

export const FixedContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    burger : props.burger,
    basisLink : props.basisLink
}))`
    position : fixed;
    display : flex;
    width : 100%;
    justify-content : space-between;
    align-items : center;
    
    ${ Links }{
        height : inherit;
        &>nav{
            display : flex;
            height : inherit;
            &>ul{
                display : flex;
            }
        }
    }
    
    
    
    ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            ${ props.basis ? generateSize(props.basis, size, 'basic') : ''}
            ${ props.basis ? generatePadding(props.basis, size, 'basic') : ''}
            ${ props.basis ? generateMargin(props.basis, size, 'basic') : ''}
            
            &.scrolled{
                ${ props.basis ? generateSize(props.basis, size, 'scroll') : ''}
                ${ props.basis ? generatePadding(props.basis, size, 'scroll') : ''}
                ${ props.basis ? generateMargin(props.basis, size, 'scroll') : ''}
            }
            
            ${ Links }{
                &>nav{
                    &>ul{
                        & li{
                            position :relative;
                            
                            &>ul{
                                position : absolute;
                                top : 100%;
                                width : 100%;
                                
                                overflow : hidden;
                                
                                & li{
                                    height : 0px;
                                    transition : height .2s cubic-bezier(.25,.46,.45,.94) 0ms;
                                    
                                    & a{
                                        width : 100%;
                                    }
                                }
                            }
                            
                            
                            &:hover{
                                & ul li{
                                     display : block;
                                     height:${ isNumber(props.basisLink[size].size.height)
                                        ? `${ props.basisLink[size].size.height }px`
                                        : props.basisLink[size].size.height };
                                }
                            }
                        }
                    }
                }
            }
            
           
            
              
         }
    `)}     

 ${ props => ['D'].map((size, i) => `
    @media ${ device[size] } {
        background-color:${ props.basis[size].color.basic.rgb ?  `rgba(${props.basis[size].color.basic.rgb},${props.basis[size].opacity.basic.value})` : props.basis[size].color.basic.hex };
        
        ${ Links }{
            &>nav>ul li ul, &>nav ${Locale} ${LanguageSelector} {
                background-color:${ props.basis[size].color.basic.rgb ?  `rgba(${props.basis[size].color.basic.rgb},${props.basis[size].opacity.basic.value})` : props.basis[size].color.basic.hex };
            }
        } 
        
        &.scrolled{
            background-color:${ props.basis[size].color.scroll.rgb ?  `rgba(${props.basis[size].color.scroll.rgb},${props.basis[size].opacity.scroll.value})` : props.basis[size].color.scroll.hex };
            
            ${ Links }{
                &>nav>ul li ul, &>nav ${Locale} ${LanguageSelector} {
                    background-color:${ props.basis[size].color.scroll.rgb ?  `rgba(${props.basis[size].color.scroll.rgb},${props.basis[size].opacity.scroll.value})` : props.basis[size].color.scroll.hex };
                }
            }
        } 
    
       ${Locale}{
            &:hover{
                & ${LanguageSelector} a{
                     height:${ isNumber(props.basisLink[size].size.height)
                        ? `${ props.basisLink[size].size.height }px`
                        : props.basisLink[size].size.height };
                }
            }
        }
    
    }
 
 `)}
 
 ${ props => ['M', 'T'].map((size, i) => `
    @media ${ device[size] } {
        ${ Links }{
            &>nav{
                background-color:${ props.basis[size].color.basic.rgb ?  `rgba(${props.basis[size].color.basic.rgb},${props.basis[size].opacity.basic.value})` : props.basis[size].color.basic.hex };
                padding-top:${ isNumber(props.basis[size].size.basic.height)
                                    ? `${ props.basis[size].size.basic.height }px`
                                    : props.basis[size].size.basic.height };
                &>ul{
                    & li{
                        &.open{
                            & ul li{
                                 display : block;
                                 height:${ isNumber(props.basisLink[size].size.height)
                                    ? `${ props.basisLink[size].size.height }px`
                                    : props.basisLink[size].size.height };
                            }
                            
                             & ${ArrowContainer}{
                                transform : rotate(0deg);
                             }
                            
                            &>ul{
                               position : initial;
                               border-top : 1px solid rgba(${ props => props.burger['M'].fill.rgb},0.3);
                                
                            }
                        }
                        &.closed{
                            & ul li{
                                height : 0px !important;
                            }
                        }     
                    }
                    
                    &>li{
                        border-bottom : 1px solid rgba(${ props.burger[size].fill.rgb},0.3);
                        &:first-child{
                            border-top : 1px solid rgba(${ props.burger[size].fill.rgb},0.3);
                        }
                        
                        & ul{
                            background-color : rgba(${ props.burger[size].fill.rgb}, 0.05) !important;
                            
                            & li {
                                padding-left : 40px;
                                padding-right : 40px;
                                
                                & a{
                                    padding-left : 0px;
                                }
                                   
                                &:not(:last-child) a{
                                    border-bottom : 1px solid rgba(${ props.burger[size].fill.rgb}, 0.3);
                                }
                            }
                        }
                    }
                }
            }
            
        }
        
        ${ Top }{
            background-color:${ props.basis[size].color.basic.rgb ?  `rgba(${props.basis[size].color.basic.rgb},${props.basis[size].opacity.basic.value})` : props.basis[size].color.basic.hex };
        }
        
        
        .scrolled{
             ${ Links }{
                &>nav{
                    background-color:${ props.basis[size].color.scroll.rgb ?  `rgba(${props.basis[size].color.scroll.rgb},${props.basis[size].opacity.scroll.value})` : props.basis[size].color.scroll.hex };
                }
             }
             ${ Top }{
                background-color:${ props.basis[size].color.scroll.rgb ?  `rgba(${props.basis[size].color.scroll.rgb},${props.basis[size].opacity.scroll.value})` : props.basis[size].color.scroll.hex };
            }
        }
        
         ${ArrowContainer}{
                height:${props =>  isNumber(props.basis[size].size.basic.height)
                                    ? `${ props.basis[size].size.basic.height }px`
                                    : props.basis[size].size.basic.height } !important;
         }
         
         & ${ LanguageSelector}{
            border-top : 1px solid rgba(${ props.burger[size].fill.rgb},0.3);
            background-color : rgba(${ props.burger[size].fill.rgb}, 0.05) !important;
            
            & ${Link}{
                transition: height 0ms ease-in-out;
                height:${ isNumber(props.basis[size].size.basic.height)
                                ? `calc(${ props.basis[size].size.basic.height }px - 10px)`
                                : props.basis[size].size.basic.height } !important;
                &:not(:last-child){
                    border-right : 1px solid rgba(${ props.burger[size].fill.rgb},0.3);
               }
               
               ${CheckContainer}{
                  width:${ isNumber(props.basis[size].size.basic.height)
                                ? `calc(${ props.basis[size].size.basic.height }px - 10px)`
                                : props.basis[size].size.basic.height } !important;
                  height:${ isNumber(props.basis[size].size.basic.height)
                                ? `calc(${ props.basis[size].size.basic.height }px - 10px)`
                                : props.basis[size].size.basic.height } !important;
               }
            }
         }
    }
 `)}

 @media  ${ device.M } , ${ device.T } {
    position : fixed;
    z-index : 5;
    display : block;
    
    ${ Top }{
        overflow-x : hidden;
        position : absolute;
        display : flex;
        align-items : center;
        justify-content : space-between;
        width : 100%;
        top : 0;
        left : 0;
        z-index : 3;
        overflow : hidden;
        transition : background-color 500ms ease-in-out;
        height :  inherit;
    
    }
    
    ${ Links }{
        width : 100%;
        transform : translateY(-100%);
        transition : transform 700ms ease-in-out;
        overflow-x : hidden;
        height : auto;
        
        &>nav{
            position : relative;
            display : flex;
            flex-direction : column;
            height : 100vh;
            top : -100vh;
            transition : transform 700ms ease-in-out;
            max-height : 100%;
            
            &>ul{
                order : 2;
                position : relative;
                float : left;
                z-index: 2;
                width : 100%;
                transition : transform 700ms ease-in-out, background-color 500ms ease-in-out;
                overflow-x : hidden;
                display : flex;
                flex-direction : column;
                align-items : flex-start;
                align-content : flex-start;
                height : calc(100% - 50px);
                max-height : calc(100% - 50px);
                
                & li{
                    width : 100%;
                    
                    & ${Link}{
                        justify-content : space-between;
                        padding-right : 0;
                    }
                    
                    & ul{
                        position : relative;
                        top : 0;
                    }  
                }
            }
        }
        
    }
    
    ${ Locale }{
        order : 1;
        ${ LanguageSelector}{
            ${ Link }{
                height : auto;
            }
        }
    }
    
    &.open{
        ${ Links }{
            transform : translateY(0%);
            
            &>nav{
                transform : translateY(100%)
            }
        }
    }
 }
`


/*
export const FixedContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    burger : props.burger
}))`
 /* display : flex;
  flex-direction : row;
  justify-content : space-between;
  position : fixed;
  width : 100%;
  z-index : 20;
  //transition : all .3s cubic-bezier(.25,.46,.45,.94) 0ms;
  box-sizing : border-box;*//*
  
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             
          /*
            



         }
          
         @media  ${ device.M } , ${ device.T } {
         


            & ${Links}{ 
                & nav > ul{
                    /*padding-top : ${ isNumber(props.basis[size].size.basic.height)
                        ? `${ props.basis[size].size.basic.height }px`
                        : props.basis[size].size.basic.height };
                        
                       
                    height : calc(100% - ${ isNumber(props.basis[size].size.basic.height)
                        ? `${ props.basis[size].size.basic.height }px`
                        : props.basis[size].size.basic.height });
                    max-height : calc(100% - ${ isNumber(props.basis[size].size.basic.height)
                        ? `${ props.basis[size].size.basic.height }px`
                        : props.basis[size].size.basic.height });
                        *//*
                         
                    &.scrolled{
                        /* padding-top : ${ isNumber(props.basis[size].size.scroll.height)
                        ? `${ props.basis[size].size.scroll.height }px`
                        : props.basis[size].size.scroll.height };*//*
                    }
                }
                }
         }
         
         & ${Locale}{
            padding-top : ${ isNumber(props.basis[size].size.basic.height)
                        ? `${ props.basis[size].size.basic.height }px`
                        : props.basis[size].size.basic.height };
         }
     `)
};

    @media  ${ device.M } , ${ device.T } {
             position : fixed;
             display : flex;
             flex-direction : column;
             background-color : transparent;
             width: 100%;
             
             &.scrolled{
                background-color : transparent;
             }
             
              & ${Links}{
                width : 100%; 
                transform: translateY(-100%);
                transition: transform 700ms ease-in-out;
                overflow-x : hidden;
                
                &>nav{
                    position : relative;
                    display : flex;
                    flex-direction : column;
                    height : 100vh;
                    top: -100vh;
                    transition: transform 700ms ease-in-out,  top 0ms ease-in-out;
                    max-height : 100%;
                    
                    &>ul{
                        position : relative;
                        float : left;
                        width : 100%;
                        transition : transform 700ms ease-in-out, background-color 500ms ease-in-out;
                        overflow-x : hidden;
                        display : flex;
                        flex-direction : column;
                        flex-wrap : wrap;
                        align-items : flex-start;
                        align-content : flex-start;
                        order : 2;
                    }
                }
              }
             
             &.open{
                background-color : transparent;
                
                 & ${Links}{
                   transform: translateY(0%);
                   
                   &>nav{
                      transform: translateY(100%);
                   }
                   
                    

                 }
             }
             
             & ${ArrowContainer}{
                height:${props =>  isNumber(props.basis['M'].size.basic.height)
                                    ? `${ props.basis['M'].size.basic.height }px`
                                    : props.basis['M'].size.basic.height } !important;
             }
             
             & ${Links}{
                & div >li{
                 border-bottom : 1px solid rgba(${ props => props.burger['M'].fill.rgb},0.3);
                    &:first-child{
                        border-top : 1px solid rgba(${ props => props.burger['M'].fill.rgb},0.3);
                    }
                }
                
                & li{
                    height : auto;
                    
                    &:hover{
                        & ul li{
                            /*height:${props =>  isNumber(props.basis['M'].size.basic.height)
                                    ? `${ props.basis['M'].size.basic.height }px`
                                    : props.basis['M'].size.basic.height } !important;*//*
                        }
                    }
                    
                    & ${Link}{
                            padding-right : 0;
                            width : 100%;
                            justify-content : space-between;
                            max-height:${props =>  isNumber(props.basis['M'].size.basic.height)
                                    ? `${ props.basis['M'].size.basic.height }px`
                                    : props.basis['M'].size.basic.height };
                    }
                    
                    &>ul{
                       width : 100%;
                        position : initial;
                        background-color : rgba(${ props => props.burger['M'].fill.rgb}, 0.05) !important;
                        
                        &>li{
                           padding-left : 40px;
                           padding-right : 40px;
                           transition : height .2s cubic-bezier(.25,.46,.45,.94) 0ms; 
                           
                           height:${props =>  isNumber(props.basis['M'].size.basic.height)
                                    ? `${ props.basis['M'].size.basic.height }px`
                                    : props.basis['M'].size.basic.height } !important;
                          
                           
                           & a{
                            padding-left : 0px;
                           }
                           
                           &:not(:last-child) a{
                            border-bottom : 1px solid rgba(${ props => props.burger['M'].fill.rgb}, 0.3);
                           }
                            
                        }
                        
                    }
                    
                    &.closed {
                        &>ul{
                           position : initial;
                            & li{
                                height : 0px !important;
                                overflow:hidden;
                            }
                        }
                    }
                    
                    &.open {
                      
                       & ${ArrowContainer}{
                        transform : rotate(0deg);
                       }
                    
                        &>ul{
                           position : initial;
                           border-top : 1px solid rgba(${ props => props.burger['M'].fill.rgb},0.3);
                            
                        }
                    }
                }
                
                & ${ Locale}{
                    width : 100%;
                    order : 1;

                    &>a{
                        width : 100%;
                    }
                }
             }
             
             & ${ LanguageSelector}{
                border-top : 1px solid rgba(${ props => props.burger['M'].fill.rgb},0.3);
                background-color : rgba(${ props => props.burger['M'].fill.rgb}, 0.05) !important;
                
                & ${Link}{
                    transition: height 0ms ease-in-out;
                    height:${props =>  isNumber(props.basis['M'].size.basic.height)
                                    ? `calc(${ props.basis['M'].size.basic.height }px - 10px)`
                                    : props.basis['M'].size.basic.height } !important;
                    &:not(:last-child){
                        border-right : 1px solid rgba(${ props => props.burger['M'].fill.rgb},0.3);
                   }
                }
             }
     }
`;*/

export const LineWrapper = styled.div`
  width : calc(100% - 100%/3 ) ;
  
  &>div{
    width : 100%;
    height : 2px;
    outline : 1px solid transparent;
    display : block;
    transform-origin : 50% 50%;
    position: relative;
    transform : translateY(0);
    transition : transform .2s cubic-bezier(.25,.46,.45,.94) 0ms;
    
    &:nth-child(2), &:nth-child(3){
        margin-top : 6px;
    }
  }
`;

export const Hamburger = styled.label.attrs(props => ({
    responsive: props.responsive,
    burger: props.burger
}))`
      display: none;
      
      cursor: pointer;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index : 5;
      
      ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.burger ? `
                ${ generateSize(props.burger, size) }
            
                & ${LineWrapper} div{
                    background-color: ${ getFormatedColor(props.burger[size].fill, props.burger[size].opacityFill) };
                }
            ` : '' } 
         }`)
    }; 
      
      @media  ${ device.M },  ${ device.T } {
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

