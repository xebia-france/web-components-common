import styled from "styled-components";
import {device} from "../../styles/constants";
import {isNumber} from "../../utils/functions";
import {generateSize,generatePadding, generateMargin, getFormatedColor, generateFontProperties, generateBorder} from "../../utils/StyleGenerator";

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
    ${ props => props.responsive.map((size) => `
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
         
            ${ props.basis ? generateSize(props.basis, size) : '' }
            ${ props.basis ? generatePadding(props.basis, size) : ''}
            ${ props.basis ? generateMargin(props.basis, size) : ''}
            ${ props.typography ? generateFontProperties(props.typography, size) : '' }
            ${ props.border ? generateBorder(props.border, size) : '' }
            ${ props.border ?
                ( props.border[size].color.basic ? `border-color : ${ getFormatedColor(props.border[size].color.basic, props.border[size].opacity.basic ) }; ` : '' )
            : ''} 
            
            background-color: ${ getFormatedColor(props.basis[size].color.basic, props.basis[size].opacity.basic )} ;
            color:${ getFormatedColor( props.typography[size].color.basic, props.typography[size].opacity.basic )};
            align-self:${ props.basis[size].alignment.horizontal || '' };
            
            & ${CheckContainer}, & ${ArrowContainer}{
                & svg polyline{
                    stroke :${ getFormatedColor( props.typography[size].color.basic, props.typography[size].opacity.basic )} !important;
                }
            }
         
            &:hover{
               background-color: ${ getFormatedColor(props.basis[size].color.hover, props.basis[size].opacity.hover )} ;
               color:${ getFormatedColor( props.typography[size].color.hover, props.typography[size].opacity.hover )};

               ${ props.border ?
                    ( props.border[size].color.hover ? `border-color : ${ getFormatedColor(props.border[size].color.hover, props.border[size].opacity.hover ) }; ` : '' )
                : ''}
            }
            
            &.selected{
               background-color: ${ getFormatedColor(props.basis[size].color.active, props.basis[size].opacity.active )} ;
               color:${ getFormatedColor( props.typography[size].color.active, props.typography[size].opacity.active )};
                ${ props.border ?
                    ( props.border[size].color.active ? `border-color : ${ getFormatedColor(props.border[size].color.active, props.border[size].opacity.active ) }; ` : '' )
                : ''}
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
         
            ${ props.basis ? generateSize(props.basis, size) : '' }
            ${ props.basis ? generatePadding(props.basis, size) : ''}
            ${ props.basis ? generateMargin(props.basis, size) : ''}
            ${ props.typography ? generateFontProperties(props.typography, size) : '' }
            ${ props.border ? generateBorder(props.border, size) : '' }
            ${ props.border ?
                ( props.border[size].color.basic ? `border-color : ${ getFormatedColor(props.border[size].color.basic, props.border[size].opacity.basic ) }; ` : '' )
            : ''} 
            
            background-color: ${ getFormatedColor(props.basis[size].color.basic, props.basis[size].opacity.basic )} ;
            align-self:${ props.basis[size].alignment.horizontal || '' };
         }`)
    };
    
`;

export const Links = styled.div``;

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
            ${ props.svg ?  generateSize(props.svg, size) : `width : 24px;`}
            
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

export const Top = styled.div``;

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
                background-color:${ props.basis[size].color.basic.rgb ?  `rgba(${props.basis[size].color.basic.rgb},1)` : props.basis[size].color.basic.hex };
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
        
        &.scrolled{
             ${ Links }{
                &>nav{
                    background-color:${ props.basis[size].color.scroll.rgb ?  `rgba(${props.basis[size].color.scroll.rgb},1)` : props.basis[size].color.scroll.hex };
                }
             }
             ${ Top }{
                background-color:${ props.basis[size].color.scroll.rgb ?  `rgba(${props.basis[size].color.scroll.rgb},${props.basis[size].opacity.scroll.value})` : props.basis[size].color.scroll.hex };
            }
        }
        
        &.open{
            ${ Top }{
                 background-color:${ props.basis[size].color.basic.rgb ?  `rgba(${props.basis[size].color.basic.rgb},1)` : props.basis[size].color.basic.hex };
            }  
            
            &.scrolled{
                ${ Top }{
                    background-color:${ props.basis[size].color.scroll.rgb ?  `rgba(${props.basis[size].color.scroll.rgb},1})` : props.basis[size].color.scroll.hex };
                }
            }  
        }
        
         ${ArrowContainer}{
                 ${ props.basisLink[size].padding && props.basisLink[size].padding.top && props.basisLink[size].padding.top !== '0' ?
                    `margin-top : -${ props.basisLink[size].padding.top }px;`
                 : ''}       
                 
                 ${ props.basisLink[size].padding && props.basisLink[size].padding.bottom && props.basisLink[size].padding.bottom !== '0' ?
                    `margin-bottom : -${ props.basisLink[size].padding.bottom }px;`
                : ''}             
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
`;


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
    
    & ${LineWrapper}{
      
        &>div:nth-child(2){
            transform : scaleX(1);
        }
      }
    }
      
    &.open{   
        &, &:hover{
      
            & ${LineWrapper}{
                &>div:nth-child(1){
                    transform : translateY(8px) rotate(45deg);
                }
                &>div:nth-child(2){
                    transform : scaleX(0);
                }
                &>div:nth-child(3){
                    transform :translateY(-8px) rotate(-45deg);
                }
              }
          }
      }  
`;
