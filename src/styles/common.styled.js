import styled from "styled-components";
import {
    generateBackgroundImage,
    generateBackgroundImageWebp,
    generateBorder,
    generateFontProperties, generateMargin,
    generatePadding,
    generateSize,
    getFormatedColor, generateBackground, generateTextColor,generateBorderColor
} from "../utils/StyleGenerator";
import {device} from "./constants";
import isEmpty from "lodash/isEmpty";


export const ContainerCommon = styled.div.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    asset: props.asset,
    assetsDirectory: props.assetsDirectory,
    basis: props.basis,
    border : props.border
}))`
   width : 100%;
   height :auto;
   display : flex;
   flex-direction : column;
   position : relative;
   overflow : hidden;
   
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
             
            &:after{
               z-index : 1;
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
                  background-image :${ props.basis[size].color.gradient  };
               ` : ''}
            }
         }`)
    };

    ${ props =>  props.responsiveContent ? props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
            
            &:before{
               z-index : 1;
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

export const TextCommon = styled.p.attrs(props => ({
    responsive: props.responsive,
    typography: props.typography,
    basis: props.basis,
    border : props.border
}))`
   ${ props => props.responsive.map(size => `
        z-index : 2;
        width : 100%;
        @media ${ device[size] } {
            ${ props.typography ? generateTextColor(props.typography,size) : ''}
            ${ props.typography ? generateFontProperties(props.typography, size) : '' }
            ${ props.basis ? generatePadding(props.basis, size) : '' }    
            ${ props.border ?  generateBorder(props.border, size) : '' }   
            ${ props.border ?  generateBorderColor(props.border, size) : '' }   
        }`)
    }; 
`;

export const ContentCommon = styled.div.attrs(props => ({
    responsive: props.responsive,
    typography : props.typography,
    basis : props.basis
}))`
    width : 100%;
    word-break: break-word;
    z-index : 2;
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.typography ? generateTextColor(props.typography,size) : ''}
            ${ props.typography ?  generateFontProperties(props.typography, size) : '' }
            ${ props.basis ?  generatePadding(props.basis, size) : '' } 
            
            &>*{
               ${ props.typography ?  generateFontProperties(props.typography, size) : '' }
            }
            & a {
               ${ props.typography ? generateTextColor(props.typography,size) : ''}
            }
         }`)
    };
    
    & iframe{
        margin-top : 40px;
        max-width : 100%;
    }
    
    & ul{
        list-style-type : circle;
        padding-left : 1.5em;
        
        & li{
            list-style : circle;
        }
    }
`;

export const ImageContainerCommon = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    border: props.border
}))`
    overflow : hidden;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    border-style : solid;
    z-index : 2;
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
         
            ${ props.basis ? generateBackground(props.basis, size) : '' }   
            ${ props.basis ? generateSize(props.basis, size) : '' }   
            ${
                props.basis && props.basis[size].size && props.basis[size].size.width === '0' ? `
                display : none;
                visibility:hidden;
                ` : ''
            }
               
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' }   
            ${ props.border ? generateBorder(props.border, size) : '' } 
            ${ props.border ? generateBorderColor(props.border, size) : '' }
               
            align-self:${ props.basis[size].alignment.horizontal || '' };
          
            &>img{
                ${  isEmpty(props.basis[size].size.width) ? `
                    width : auto;
                    height : 100%; 
                
                ` : (!isEmpty(props.basis[size].size.width) && !isEmpty(props.basis[size].size.height) ? `
                    width : 100%;
                    height : 100%;
                ` : `
                    width : 100%;
                    height : auto;
                `)   }
            } 
         }`)
    };     
`;

export const CTACommon = styled.a.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    typography: props.typography,
    border: props.border,
    icon: props.icon,
    animateUnderline : props.animateUnderline || null
}))`
    transition : color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease, background 0.25s ease;
    border-style : solid;
    display : flex;
    align-items: center;
    z-index : 2;
    cursor : pointer;
    overflow : hidden;
    & p, & i{
       transition : color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease, background 0.25s ease;
    }
    
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.basis ? generateBackground(props.basis, size, 'basic') : '' } 
            ${ props.basis ? generateSize(props.basis, size) : '' } 
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
            ${ props.border ? generateBorder(props.border, size) : '' }
            ${ props.border ? generateBorderColor(props.border, size, 'basic') : '' }
         
            box-shadow : ${ props.basis[size].shadow.value || '' };
            align-self:${ props.basis[size].alignment.horizontal || '' };

            & i {
                ${ props.icon ? generateTextColor(props.icon, size, 'basic') : '' }
                ${ props.icon ? generateFontProperties(props.icon, size) : '' }
                ${ props.icon ? generatePadding(props.icon, size) : '' }
            }
         
            & p {
                width : 100%;
                ${ props.typography ? generateTextColor(props.typography, size, 'basic') : '' }
                ${ props.typography ? generateFontProperties(props.typography, size) : '' }
            }
         
            &:hover{
                ${ props.basis ? generateBackground(props.basis, size, 'hover') : '' } 
                ${ props.border ? generateBorderColor(props.border, size, 'hover') : '' }
                
                & p{
                    ${ props.typography ? generateTextColor(props.typography, size, 'hover') : '' }
                }
               
                & i {
                    ${ props.icon ? generateTextColor(props.icon, size, 'hover') : '' }
                }
            }
            
            &.disabled{
                cursor : default;
                ${ props.basis ? generateBackground(props.basis, size, 'disabled') : '' } 
                ${ props.border ? generateBorderColor(props.border, size, 'disabled') : '' }
                
                & p{
                    ${ props.typography ? generateTextColor(props.typography, size, 'disabled') : '' }
                }
               
                & i {
                   ${ props.icon ? generateTextColor(props.icon, size, 'disabled') : '' }
                }
               
                &:hover{
                    ${ props.basis ? generateBackground(props.basis, size, 'disabled') : '' } 
                    ${ props.border ? generateBorderColor(props.border, size, 'disabled') : '' }
                    
                    & p{
                        ${ props.typography ? generateTextColor(props.typography, size, 'disabled') : '' }
                    }
                   
                    & i {
                        ${ props.icon ? generateTextColor(props.icon, size, 'disabled') : '' }
                    }
                }
            }
            
            ${ props.animateUnderline ? `
                ${ props.typography[size].text.decoration === 'underline' ?
                `
                    position : relative;
                    overflow : visible;
                    & p{
                        text-decoration : none;
                        padding-bottom : 3px;
                    }
                    
                    &:before{
                        content : '';
                        position : absolute;
                        width : 100%;
                        height :  2px;
                        transition : all 0.3s cubic-bezier(0.32, 0.01, 0, 1);
                        bottom : 0;
                        ${ props.typography ? generateBackground(props.typography, size, 'basic') : '' } 

                    }
                    
                    &:hover{
                         &:before{
                            width : 0;
                            ${ props.typography ? generateBackground(props.typography, size, 'hover') : '' } 
                         }
                    }
                `
                : ``}
            ` : '' }
        }`)};
`;

export const IconCommon = styled.a.attrs(props => ({
    responsive: props.responsive,
    icon: props.icon
}))`
    transition : all 0.25s ease;
    border-style : solid;
    display : flex;
    align-items: center;
    z-index : 2;
    cursor : pointer;
    
    & i{
       transition : all 0.25s ease;
    }
    
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.icon ? generateMargin(props.icon, size) : '' } 
            
            & i {
                ${ props.icon ? generateTextColor(props.icon, size, 'basic') : ''}
                ${ props.icon ? generateFontProperties(props.icon, size) : '' }
            }
            
            &:hover{
                & i {
                    ${ props.icon ? generateTextColor(props.icon, size, 'hover') : ''}
                }
            }
        }`)};
`;