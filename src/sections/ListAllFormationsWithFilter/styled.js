import styled from 'styled-components';
import {device} from "../../styles/constants";
import {
    generatePadding, generateSize, generateMargin,
    generateBorder, generateFontProperties, generateBackground,
    generateBackgroundImage, getFormatedColor, generateBackgroundImageWebp, generateBorderColor, generateTextColor
} from "../../utils/StyleGenerator";

export const Wrapper = styled.section.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    basis: props.basis,
    border: props.border,
    asset : props.asset,
    assetsDirectory : props.assetsDirectory

}))`
  display : flex;
  flex-direction : column;
  width: 100%;  
  position : relative;
  overflow : hidden;
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
            ${ props.basis ? generatePadding(props.basis, size) : '' }
            ${ props.border ?  generateBorder(props.border, size) : '' }        
            ${ props.border ?  generateBorderColor(props.border, size) : '' }        
                
            &:after{
               z-index : 0;
               position : absolute;
               width : 100%;
               height : 100%;
               content : ''; 
               ${ props.basis[size].background &&  props.basis[size].background.top ? `
                  top:${ props.basis[size].background.top  }px;
                ` : 'top : 0;'}
               left : 0;
               ${props.basis ? generateBackground(props.basis, size): ''}
               ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background:${ props.basis[size].color.gradient  };
               ` : ''}
            }
         }`)
    }; 
    
    ${ props =>  props.responsiveContent ? props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
          
            &:before{
               z-index : 0;
               position : absolute;
               width : 100%;
               height : 100%;
               content : ''; 
               top : 0;
               left : 0;
            }
            
            .no-webp &:before{
               ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}  
            }
            .webp &:before{
               ${ props.asset ? generateBackgroundImageWebp(props.asset, size, props.assetsDirectory) : ''}  
            }
         }`) : ''
    };
`;


export const WrapperCategory = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    border: props.border,

}))`
display : flex;
  flex-direction : column;
  width: 100%;  
  position : relative;
  overflow : hidden;
  z-index : 2;
  
  
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
            ${ props.basis ? generatePadding(props.basis, size) : '' }
            ${ props.border ?  generateBorder(props.border, size) : '' }        
            ${ props.border ?  generateBorderColor(props.border, size) : '' }        
           
           ${props.basis ? generateBackground(props.basis, size): ''}
           ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background:${ props.basis[size].color.gradient  };

               ` : ''}
               
          &>*{
             ${ props.basis ? generateSize(props.basis, size) : 'width : inherit;' } 
             align-self : center;
          }     
            
         }`)
    }; 
`;


export const List = styled.div.attrs(props => ({
    responsive: props.responsive,
    flex: props.flex

}))`
  //max-width : 1280px;
  margin: auto;
  
  display : flex;
  z-index : 2;
  
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             
             flex-direction : ${ props.flex[size].properties.direction };
             flex-wrap: ${ props.flex[size].properties.wrap };
             justify-content: ${ props.flex[size].properties.justify };
             align-items: ${ props.flex[size].properties.alignItems };
             align-content: ${ props.flex[size].properties.alignContent };
             margin-bottom : -${ props.flex[size].properties.gutterVertical }px;
             
             &>*{
                width: calc(100% / ${ props.flex[size].properties.columns } - ${   ((props.flex[size].properties.columns - 1) * props.flex[size].properties.gutterHorizontal) / props.flex[size].properties.columns }px );
                margin-bottom : ${ props.flex[size].properties.gutterVertical }px;
                
                ${props.flex[size].properties.justify === 'flex-start' ? `
                    &:not(:nth-child(${ props.flex[size].properties.columns }n) ){
                        margin-right : ${props.flex[size].properties.gutterHorizontal}px;
                    }
                    
                    `  : ''
    }
                ${props.flex[size].properties.justify === 'flex-end' ? `
                    &:not(:nth-child(${ props.flex[size].properties.columns }n + 1)){
                      margin-left : ${props.flex[size].properties.gutterHorizontal}px;
                    }
                    `  : ''
    }
                
                ${props.flex[size].properties.justify === 'center' ? `
                    &:not(:nth-child(${ props.flex[size].properties.columns }n + 1)){
                      margin-left : ${props.flex[size].properties.gutterHorizontal}px;
                    }
                    `  : ''
    }
                
             }
             
         }`)
    }; 
`;


export const Selector = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    typography: props.typography,
    border: props.border,
    icon: props.icon,
}))`

    
    transition : color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
    border-style : solid;
    display : flex;
    align-items: center;
    z-index : 2;
    cursor : pointer;
   // overflow : hidden;
    position : relative;
    
   
   &>svg{
        position : absolute;
        height : inherit;
        width : 12px;
        right : 12px;
   }
   
    & select, & option, & i, & svg path{
       transition : color 0.25s ease,fill 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
    }

    & select{
        cursor : pointer;
        outline:none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }    
    
    
       ${ props => props.responsive.map(size => `
             @media ${ device[size] } {
             
               align-self:${ props.basis[size].alignment.horizontal || '' };
               ${ props.basis ? generateMargin(props.basis, size) : '' } 
               ${props.typography ? generateTextColor(props.typography, size, 'basic') : ''}
               ${ props.typography ? generateFontProperties(props.typography, size) : '' }

                &:hover{
                    &>svg path{
                        fill : ${ getFormatedColor(props.border[size].color.hover, props.border[size].opacity.hover)};     
                      
                   }
                }

               & select{
                    ${props.basis ? generateBackground(props.basis, size, 'basic'): ''}        
                    ${ props.basis ? generateSize(props.basis, size) : '' } 
                    ${ props.basis ? generatePadding(props.basis, size) : '' }       
                    ${ props.border ? generateBorder(props.border, size) : '' }
                    ${ props.border ? generateBorderColor(props.border, size, 'basic') : '' }
                    box-shadow : ${ props.basis[size].shadow.value || '' };
        
                    & i {
                        ${props.icon ? generateTextColor(props.icon, size, 'basic') : ''}
                        ${ props.icon ? generateFontProperties(props.icon, size) : '' }
                        ${ props.icon ? generatePadding(props.icon, size) : '' }
                    }
                 
                    &:hover{
                        ${props.basis ? generateBackground(props.basis, size, 'hover') : ''}
                        ${props.border ? generateBorderColor(props.border, size, 'hover') : ''}
                        ${props.typography ? generateTextColor(props.typography, size, 'hover') : ''}
                        
                        & i {
                            ${props.icon ? generateTextColor(props.icon, size, 'hover') : ''}
                        }
                    }
                    
                    &.disabled{
                        cursor : default;
                        ${props.basis ? generateBackground(props.basis, size, 'disabled') : ''}
                        ${props.border ? generateBorderColor(props.border, size, 'disabled') : ''}
                        ${props.typography ? generateTextColor(props.typography, size, 'disabled') : ''}
                       
                        & i {
                            ${props.icon ? generateTextColor(props.icon, size, 'disabled') : ''}
                        }
                       
                        &:hover{
                            ${props.basis ? generateBackground(props.basis, size, 'disabled') : ''}
                            ${props.border ? generateBorderColor(props.border, size, 'disabled') : ''}
                            ${props.typography ? generateTextColor(props.typography, size, 'disabled') : ''}
                      
                            & i {
                                ${props.icon ? generateTextColor(props.icon, size, 'disabled') : ''}
                            }
                        }
                    }
               }
    }`)};
`;