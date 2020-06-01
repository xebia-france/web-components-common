import styled from "styled-components";
import {
    generateBackgroundImage,
    generateBorder,
    generateFontProperties, generateMargin,
    generatePadding,
    generateSize,
    getFormatedColor
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
            ${ props.border ?
                ( props.border[size].color ? `border-color : ${ getFormatedColor(props.border[size].color, props.border[size].opacity ) }; ` : '' )
            : ''}
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
               background-color: ${ getFormatedColor(props.basis[size].color, props.basis[size].opacity) };
           ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background:${ props.basis[size].color.gradient  };

               ` : ''}
            }
         }`)
    };

    ${ props =>  props.responsiveContent ? props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
            ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}  
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
            ${ props.typography ? `color: ${ getFormatedColor(props.typography[size].color, props.typography[size].opacity) };` : ''}
            ${ props.typography ? generateFontProperties(props.typography, size) : '' }
            ${ props.basis ? generatePadding(props.basis, size) : '' }    
            ${ props.border ?  generateBorder(props.border, size) : '' }   
            ${ props.border ?
                    ( props.border[size].color ? `border-color : ${ getFormatedColor(props.border[size].color, props.border[size].opacity ) }; ` : '' )
            : ''}
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
            color:${ getFormatedColor(props.typography[size].color, props.typography[size].opacity) };
            ${ props.typography ?  generateFontProperties(props.typography, size) : '' }
            ${ props.basis ?  generatePadding(props.basis, size) : '' } 
            
            &>*{
               ${ props.typography ?  generateFontProperties(props.typography, size) : '' }
            }
            & a {
               color:${ getFormatedColor(props.typography[size].color, props.typography[size].opacity )};
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
         
            ${ props.basis ? generateSize(props.basis, size) : '' }      
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' }   
            ${ props.border ? generateBorder(props.border, size) : '' } 
            ${ props.border ?
                ( props.border[size].color ? `border-color : ${ getFormatedColor(props.border[size].color, props.border[size].opacity ) }; ` : '' )
            : ''}
               
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
    transition : all 0.25s ease;
    border-style : solid;
    display : flex;
    align-items: center;
    z-index : 2;
    cursor : pointer;
    overflow : hidden;
    & p, & i{
       transition : all 0.25s ease;
    }
    
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            background-color: ${ getFormatedColor(props.basis[size].color.basic, props.basis[size].opacity.basic )} ;

            ${ props.basis ? generateSize(props.basis, size) : '' } 
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
            ${ props.border ? generateBorder(props.border, size) : '' }
            ${ props.border ?
                ( props.border[size].color.basic ? `border-color : ${ getFormatedColor(props.border[size].color.basic, props.border[size].opacity.basic ) }; ` : '' )
            : ''} 
         
            box-shadow : ${ props.basis[size].shadow.value || '' };
            align-self:${ props.basis[size].alignment.horizontal || '' };

            & i {
                
                ${ props.icon ? `color: ${ getFormatedColor(props.icon[size].color.basic, props.icon[size].opacity.basic) };` : ''}
                ${ props.icon ? generateFontProperties(props.icon, size) : '' }
                ${ props.icon ? generatePadding(props.icon, size) : '' }
            }
         
            & p {
                width : 100%;
                color:${ getFormatedColor( props.typography[size].color.basic, props.typography[size].opacity.basic )};
                ${ props.typography ? generateFontProperties(props.typography, size) : '' }
            }
         
            &:hover{
                background-color:${ getFormatedColor( props.basis[size].color.hover, props.basis[size].opacity.hover)};
                border-color : ${ getFormatedColor(props.border[size].color.hover, props.border[size].opacity.hover)};     
               
                & p{
                    color:${ getFormatedColor(props.typography[size].color.hover, props.typography[size].opacity.hover )};
                }
               
                & i {
                    ${ props.icon ? `color:${ getFormatedColor(props.icon[size].color.hover, props.icon[size].opacity.hover )};` : ''}
                }
            }
            
            &.disabled{
                cursor : default;
                background-color:${ getFormatedColor(props.basis[size].color.disabled, props.basis[size].opacity.disabled)};
                border-color : ${ getFormatedColor(props.border[size].color.disabled, props.border[size].opacity.disabled)};     
              
                & p{
                    color:${getFormatedColor(props.typography[size].color.disabled, props.typography[size].opacity.disabled)};
                }
               
                & i {
                   ${ props.icon ? `color:${ getFormatedColor(props.icon[size].color.disabled, props.icon[size].opacity.disabled)};` : ''}
                }
               
                &:hover{
                    background-color:${ getFormatedColor(props.basis[size].color.disabled, props.basis[size].opacity.disabled )};
                    border-color : ${ getFormatedColor(props.border[size].color.disabled, props.border[size].opacity.disabled )};     
              
                    & p{
                        color:${ getFormatedColor(props.typography[size].color.disabled, props.typography[size].opacity.disabled )};
                    }
                   
                    & i {
                       ${ props.icon ? `color:${ getFormatedColor(props.icon[size].color.disabled, props.icon[size].opacity.disabled )};` : ''}
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
                        background-color: ${ getFormatedColor( props.typography[size].color.basic, props.typography[size].opacity.basic )} ;
            
                    }
                    
                    &:hover{
                         &:before{
                            width : 0;
                            background-color:${ getFormatedColor(props.typography[size].color.hover, props.typography[size].opacity.hover )};
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
                
                ${ props.icon ? `color: ${ getFormatedColor(props.icon[size].color.basic, props.icon[size].opacity.basic) };` : ''}
                ${ props.icon ? generateFontProperties(props.icon, size) : '' }
            }
         
           
         
            &:hover{
                & i {
                    ${ props.icon ? `color:${ getFormatedColor(props.icon[size].color.hover, props.icon[size].opacity.hover )};` : ''}
                }
            }
            
            
        }`)};
`;