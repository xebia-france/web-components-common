import styled from "styled-components";
import {device} from "../../styles/constants";
import {isNumber} from "../../utils/functions";
import {
    generateSize,
    generatePadding,
    generateMargin,
    getFormatedColor,
    generateFontProperties,
    generateBorder,
    generateBorderColor, generateBackground, generateTextColor
} from "../../utils/StyleGenerator";
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

export const ArrowContainer = styled.div`
  display : none;
  width : 30px;
  height : 30px;
  cursor : pointer;
  position : absolute;
  right : 0;
  opacity : 0.5;
  
  &>svg{
    width : 100%;
  } 
  
  @media  ${ device.T }, ${ device.D } {
    display : flex;
    position : relative;
    width :22px;
    height : 22px;
    padding-top : 2px;
    margin-left : 5px;
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
    position : relative;
    cursor : pointer:
    z-index : 2;
    cursor : pointer;
  
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
         
            ${ props.basis ? generateSize(props.basis, size) : '' }
            ${ props.basis ? generatePadding(props.basis, size) : ''}
            ${ props.basis ? generateMargin(props.basis, size) : ''}
            ${ props.typography ? generateFontProperties(props.typography, size) : '' }
            ${ props.border ? generateBorder(props.border, size) : '' }
            ${ props.border ? generateBorderColor(props.border, size, 'basic') : '' }
            
            ${props.basis ? generateBackground(props.basis, size, 'basic') : ''}
            ${props.typography ? generateTextColor(props.typography, size, 'basic') : ''}
            
            align-self:${ props.basis[size].alignment.horizontal || '' };
            
            & ${CheckContainer}, & ${ArrowContainer}{
                & svg polyline{
                    stroke :${ getFormatedColor( props.typography[size].color.basic, props.typography[size].opacity.basic )} !important;
                }
            }
         
            &:hover{
                ${props.basis ? generateBackground(props.basis, size, 'hover') : ''}
                ${props.typography ? generateTextColor(props.typography, size, 'hover') : ''}
                ${ props.border ? generateBorderColor(props.border, size, 'hover') : '' }
            }
            
            &.selected{
                ${props.basis ? generateBackground(props.basis, size, 'active') : ''}
                ${props.typography ? generateTextColor(props.typography, size, 'active') : ''}
                ${ props.border ? generateBorderColor(props.border, size, 'active') : '' }
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
            ${ props.border ? generateBorderColor(props.border, size, 'basic') : '' }
            ${props.basis ? generateBackground(props.basis, size) : ''}
            
            align-self:${ props.basis[size].alignment.horizontal || '' };
         }`)
    };
    
`;

export const Links = styled(ContainerCommon).attrs(props => ({
    responsive : props.responsive,
    basisTemplateLeft : props.basisTemplateLeft
}))`
   transition : transform .2s cubic-bezier(.25,.46,.45,.94) 0ms;
   position: relative;
    &>nav{
        z-index: 2;
        height : inherit;
        
        &>ul{
        
            
        }
    }
    
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
            display : flex;
            align-items : center;
            justify-content : flex-end;
            &>ul{
                display : flex;
                flex-direction : row;
                height : 100%;
                align-items : center;
                
                &>li{
                    height : 100% !important;
                    
                    &>a{
                        height : 100%;
                    }
                }
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
 
    ${ props =>  props.responsive && props.responsive.map((size, i) => `
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
    transition : transform .2s cubic-bezier(.25,.46,.45,.94) 0ms;
    transform : translateY(0);
    
   
    
    &.hidden{
        transform : translateY(-100%);
    }
    
     @media  ${ device.T }, ${ device.D }{
        
        &.linkOpened.hidden{
            transform : translateY(0);
        }
    }
    
     @media  ${ device.M }{
        flex-direction : column;
        
        &.open.hidden{
            transform : translateY(0);
        }
    }
    
    ${ props => ['M'].map((size, i) => `
         @media ${ device[size] } {
         
             ${ props.basis ? `
                    max-height : ${isNumber(props.basis[size].size.height)
    ? `${ props.basis[size].size.height }px`
    : props.basis[size].size.height};
                
                ` : ''}
                
                    &.open{
                        max-height : 100%;
                    }
         }`)
    };
    
    
`



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
    basis: props.basis
}))`
      display: none;
      cursor: pointer;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index : 5;
      
      ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.basis ? `
                ${ generateSize(props.basis, size) }
            
                & ${LineWrapper} div{
                    ${props.basis ? generateBackground(props.basis, size) : ''}
                }
            ` : '' } 
         }`)
    }; 
      
    @media  ${ device.M } {
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
`

export const LinksChildren = styled.ul.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    border : props.border,
    basisLinks : props.basisLinks
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
            ${ props.border ?  generateBorderColor(props.border, size) : '' }    
            
            ${ props.basis &&  props.basis[size].shadow ?
            (  props.basis[size].shadow.value !== 'none' ? `box-shadow : ${ props.basis[size].shadow.value }; ` : '' )
            : ''}
             
            ${props.basis ? generateBackground(props.basis, size) : ''}
            ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background:${ props.basis[size].color.gradient  };
               ` : ''}
            }   
            
         }`)
    };
    ${ props => ['T', 'D'].map((size, i) => `
         @media ${ device[size] } {
         
             ${ props.basisLinks ? `
                    height : calc(100vh - ${isNumber(props.basisLinks[size].size.height)
    ? `${ props.basisLinks[size].size.height }px`
    : props.basisLinks[size].size.height});
                
                ` : ''}
            
         }`)
    };
    
    @media  ${ device.T }, ${ device.D }{
        position : absolute;
        right : 0;
        width : 100%;
    }
`

export const BackgroundNavigation = styled.div.attrs(props => ({
    show : props.show,
    responsive : props.responsive,
    basis : props.basis,
}))`
    ${ props => ['T', 'D'].map((size, i) => `
         @media ${ device[size] } {
         
             ${ props.basis ? `
                ${generateBackground(props.basis, size)}
             ` : `
             background-color : transparent;
             `}
         }`)
    };
    
    
    display : ${props => props.show ? 'block' : 'none'};
    position  : fixed;
    width : 100%;
    height : 100vh;
    content: '';
    
    @media  ${ device.M }{
       display : none;
    }
    
`
