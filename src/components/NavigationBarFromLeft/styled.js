import styled from "styled-components";
import {device} from "../../styles/constants";
import {isNumber} from "../../utils/functions";
import {generateSize,generatePadding, generateMargin, getFormatedColor, generateFontProperties, generateBorder} from "../../utils/StyleGenerator";
import {ContainerCommon} from "../../styles/common.styled";

export const Container = styled.div.attrs(props => ({

}))`
  width : 100%;
  transition : all .2s cubic-bezier(.25,.46,.45,.94) 0ms;
  z-index : 50;
`;
export const Logo = styled.div.attrs(props => ({

}))`
  z-index : 2;
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


export const LinksChildren = styled.ul.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    border : props.border,
    basisLinks : props.basisLinks,
    basisTemplateLeft: props.basisTemplateLeft
}))`
    position : relative;
    overflow : hidden;
    display : none;
    
    
    ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
         
            ${ props.basis ? generateSize(props.basis, size) : '' }       
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
            ${ props.border ?  generateBorder(props.border, size) : '' }    
            ${ props.border ? ( props.border[size].color ?
    `border-color : ${ getFormatedColor(props.border[size].color, props.border[size].opacity ) }; ` : '' ) : ''}
            ${ props.basis &&  props.basis[size].shadow ? (  props.basis[size].shadow.value !== 'none' ?
    `box-shadow : ${ props.basis[size].shadow.value }; ` : '' ) : ''}
            background-color: ${ getFormatedColor(props.basis[size].color, props.basis[size].opacity) };
            ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background:${ props.basis[size].color.gradient  };` : ''}
           }
            
            
         }`)
    };
    ${ props => ['T', 'D'].map((size, i) => `
        transition : transform 0.7s cubic-bezier(0.32, 0.01, 0, 1);
        
         @media ${ device[size] } {
             ${ props.basisTemplateLeft ? `
                height : 100%;
                padding-top : ${isNumber(props.basisTemplateLeft[size].size.height) ? `${ props.basisTemplateLeft[size].size.height }px` : props.basisLinks[size].size.height};                
              
               ` : ''}
            
         }`)
    };
    
    @media  ${ device.T }, ${ device.D }{
        display : block;
        transform : translateX(-101%);
    }
`;


export const ChildrenContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    border : props.border,
    basisLinks : props.basisLinks,
    basisTemplateLeft: props.basisTemplateLeft
}))`
    position : relative;
    overflow : hidden;
 
    ${ props => ['T', 'D'].map((size, i) => `
        transition : transform 0.7s cubic-bezier(0.32, 0.01, 0, 1);
        
         @media ${ device[size] } {
             ${ props.basisTemplateLeft ? `
                height : 100vh;
                top : -${isNumber(props.basisTemplateLeft[size].size.height) ? `${ props.basisTemplateLeft[size].size.height }px` : props.basisLinks[size].size.height};
                width : 100%;
                left : 100%;
               ` : ''}
         }`)
    };
    
    @media  ${ device.T }, ${ device.D }{
        position : absolute;
        display : block;
    }
    @media  ${ device.M }{
        width : 100%;
    }
`;

export const ArrowContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    typography: props.typography,
    border: props.border
}))`
  display : none;
  width : 30px;
  height : 30px;
  cursor : pointer;
  position : absolute;
  right : 0;
  opacity : 0.3;
  
  &>svg{
    width : 100%;
  } 
  ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.typography && props.typography[size].font.lineHeight ?
        `
            top : 5px;
            width : ${ props.typography[size].font.lineHeight - 10 }px;
            height : ${ props.typography[size].font.lineHeight - 10 }px;
        
        
        `
        : ''}
         
            
         }`)
    };
  
  
  @media  ${ device.T }, ${ device.D } {
    display : flex;
    transform : rotate(270deg);
    right : 20px;
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
   // display : flex;
    align-items: center;
    position : relative;
    cursor : pointer:
    z-index : 2;
    cursor : pointer;
    width : 100%;
  
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
               
           &>span{
            
                display:inline;
                border-bottom-width:3px;
                border-bottom-style:solid;
                border-color : ${ getFormatedColor( props.typography[size].color.basic, props.typography[size].opacity.basic )};
           }
         
            &:hover{
               background-color: ${ getFormatedColor(props.basis[size].color.hover, props.basis[size].opacity.hover )} ;
               color:${ getFormatedColor( props.typography[size].color.hover, props.typography[size].opacity.hover )};
               
               ${ props.border ? ( props.border[size].color.hover ? 
                `border-color : ${ getFormatedColor(props.border[size].color.hover, props.border[size].opacity.hover ) }; ` : '' )
                : ''}
                &>span{
                    border-color : ${ getFormatedColor( props.typography[size].color.hover, props.typography[size].opacity.hover )};
               }
    
            }
            
            &.selected, &.active{
               background-color: ${ getFormatedColor(props.basis[size].color.active, props.basis[size].opacity.active )} ;
               color:${ getFormatedColor( props.typography[size].color.active, props.typography[size].opacity.active )};
                ${ props.border ? ( props.border[size].color.active ? 
                `border-color : ${ getFormatedColor(props.border[size].color.active, props.border[size].opacity.active ) }; ` : '' ) : ''}
            
                 &>span{
                    border-color : ${ getFormatedColor( props.typography[size].color.active, props.typography[size].opacity.active )} !important;
                 }
            }
         }`)
    };
    
    @media  ${ device.M }{
        ${ props =>  props.basis && props.basis['M'].padding && props.basis['M'].padding.right && props.basis['M'].padding.right !== '0' ?
    `
        &>${ArrowContainer}{
            display : flex;
            align-items : center;
            right : ${ props.basis['M'].padding.right }px;
        }
    `
    : ''}
    }
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

export const LinksContainer = styled(ContainerCommon).attrs(props => ({
    responsive : props.responsive,
    basisTemplateLeft : props.basisTemplateLeft
}))`
   transition : transform 0.7s cubic-bezier(0.32, 0.01, 0, 1);
   position: relative;
    &>nav{
        z-index: 2;
        height : inherit;
        
        &>ul{}
    }
    
    &>nav>ul>li:not(.open)>${Link}.active span{
        border-bottom-color : transparent !important;
    }
    
    ${ props => ['T', 'D'].map((size, i) => `
         @media ${ device[size] } {
            
            ${ props.basisTemplateLeft ? `
                   width : ${isNumber(props.basisTemplateLeft[size].size.width) ? `${ props.basisTemplateLeft[size].size.width }px` : props.basisTemplateLeft[size].size.width};
                   height : calc(100vh - ${isNumber(props.basisTemplateLeft[size].size.height) ? `${ props.basisTemplateLeft[size].size.height }px` : props.basisTemplateLeft[size].size.height});
                        
            ` : ''
            }
            
            
            transform : translateX(-100%);
            
            &.open{
                transform : translateX(0%);
            }
            
            
         }`
    )};
    
    
    @media  ${ device.M }{
        
        &>nav{
            padding-bottom : 50px;
        }
        
        transform : translateY(-100%);
        &.open{
            transform : translateY(0);
        }
    
        &>nav{
        
            overflow-y: scroll;
            ${ props =>
    props.basisTemplateLeft ? `
                    height : calc(100vh - ${isNumber(props.basisTemplateLeft['M'].size.height)
        ? `${ props.basisTemplateLeft['M'].size.height }px`
        : props.basisTemplateLeft['M'].size.height});
                
                ` : ''
    }
            &>ul{
               position : relative;
               display : flex;
               flex-direction : column;
               
               &>li{
                    width : 100%;
               }
            }
        }
    }
    
    @media  ${ device.T }, ${ device.D }{
        overflow : visible;
        & nav{
            &>ul{
                display : flex;
                flex-direction : column;
            }
        }
    }
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

export const FixedBar = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    border : props.border
}))`
    position : fixed;
    display : flex;
    width : 100%;
    transition : transform .2s cubic-bezier(.25,.46,.45,.94) 0ms, max-height .0s cubic-bezier(.25,.46,.45,.94) 0.7s;
    transform : translateY(0);
    top : 0;
    flex-direction : column;
    overflow : hidden;
    
    &.hidden{
        transform : translateY(-100%);
    }
    
    &.open{
        max-height : 100%;
        transition : transform .2s cubic-bezier(.25,.46,.45,.94) 0ms, max-height .0s cubic-bezier(.25,.46,.45,.94) 0.0s;
    }
    
    &.open.hidden{
        transform : translateY(0);
    }
    
     ${ props => ['T', 'D'].map((size, i) => `
         @media ${ device[size] } {
            &.linkOpened.hidden{
                transform : translateY(0);
            }
            
            &.visible{
                transform : translateY(0);
            }
         }`)
    };
    
    ${ props => ['M', 'T', 'D'].map((size, i) => `
         @media ${ device[size] } {
             ${ props.basis ? `
                    max-height : ${isNumber(props.basis[size].size.height) ? `${ props.basis[size].size.height }px` : props.basis[size].size.height};
                
                ` : ''}
                    ${ContainerLeft}{
                        min-height : ${isNumber(props.basis[size].size.height) ? `${ props.basis[size].size.height }px` : props.basis[size].size.height};
                    }
         }`)
    };
`;




export const ContainerLeft = styled(ContainerCommon).attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
    flex-direction : row;
    justify-content : space-between;
    
    ${ props => ['M'].map((size, i) => `
         @media ${ device[size] } {
         
             ${ props.basis ? `
                    min-height : ${isNumber(props.basis[size].size.height)
    ? `${ props.basis[size].size.height }px`
    : props.basis[size].size.height};
                
                ` : ''}
         }`)
    };
`;




export const IconToggle = styled.div.attrs(props => ({}))`
    position : relative;
    width : 24px;
    margin : 6px 10px 0 0;
    height : 2px;
    transition : transform 0.3s;
    
    &:after{
        content: '';
        display: block;
        top: 5px;
        right: 0;
        width: 50%;
        height: 2px;
        position: absolute;
        transition: transform 0.3s;
    }
    
`;

export const Toggle = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    basisTemplateLeft : props.basisTemplateLeft,
    typography: props.typography
}))`
    z-index: 10;
    display : flex;
    transition : color 0.25s ease, border-color 0.25s ease;
    border-style : solid;
    display : flex;
    align-self: center !important;
    position : relative;
    cursor : pointer:
    z-index : 2;
    cursor : pointer;
    
    &>span{
        font-size : 16px;
        line-height : 16px;
    }
  
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.typography ? generateFontProperties(props.typography, size) : '' }
           
            background-color: ${ getFormatedColor(props.basis[size].color.basic, props.basis[size].opacity.basic )} ;
            color:${ getFormatedColor( props.typography[size].color.basic, props.typography[size].opacity.basic )};
            align-self:${ props.basis[size].alignment.horizontal || '' };
            
            & ${IconToggle}, & ${IconToggle}:after{
                background :${ getFormatedColor( props.typography[size].color.basic, props.typography[size].opacity.basic )}; 
            }
            
            &.open{
               background-color: ${ getFormatedColor(props.basis[size].color.active, props.basis[size].opacity.active )} ;
               color:${ getFormatedColor( props.typography[size].color.active, props.typography[size].opacity.active )};
            
                & ${IconToggle}, & ${IconToggle}:after{
                    background :${ getFormatedColor( props.typography[size].color.active, props.typography[size].opacity.active )}; 
                }
            }
         }`)
    };
    
    &.open{
        & ${IconToggle}{
            transform: rotate(45deg);
            width: 18px;
            margin-top: 8px;
            
            &:after{
                top: 0;
                width: 100%;
                transform: rotate(-90deg);
            }
        }
    
    }
`;

export const ClosingArea = styled.div.attrs(props => ({
    open : props.open,
    openSubLink : props.openSubLink
}))`
   position : absolute;
   width : 0;
   height : 0;
   top : 0;
   right : 0;
   display : none;
   z-index : 6;
   
   ${ props => ['T', 'D'].map(size => `
         @media ${ device[size] } {
           ${props.open ? `
                display : block;
                width : calc(100% * (2/3));
                height : 100%;
           ` : ''}
           
           ${props.openSubLink ? `
                width : calc(100% * (1/3));
           ` : ''}
           
         }`)
    };
`;
