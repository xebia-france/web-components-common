import styled from 'styled-components';
import { device } from '../../styles/constants';
import {isNumber} from '../../utils/functions';
import  isEmpty  from 'lodash/isEmpty'
import {
    generateSize,
    generatePadding,
    generateMargin,
    generateFontProperties,
    generateBorder
} from "../../utils/StyleGenerator";

export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    asset : props.asset,
    assetsDirectory : props.assetsDirectory,
    basis : props.basis,
    border : props.border
}))`
   width : 100%;
   height :auto;
   display : flex;
   flex-direction : column;
   align-items : center;
   position : relative;
   overflow : hidden;
   
   
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             
            ${ props.basis ? generateSize(props.basis, size) : '' }       
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
            ${ props.border ?  generateBorder(props.border, size) : '' }        
            ${ props.border ? 
                    ( props.border[size].color ? 
                        `border-color :${ props.border[size].color.rgb ? `rgba(${props.border[size].color.rgb},${props.border[size].opacity.value});` 
                                                                        : `${props.border[size].color.hex};`}` : '')
             : ''}
           
            
            &:before{
               z-index : 1;
               position : absolute;
               width : 100%;
               height : 100%;
               content : ''; 
               top : 0;
               left : 0;
               background-color:${ props.basis[size].color.rgb ?  `rgba(${props.basis[size].color.rgb},${props.basis[size].opacity.value})` : props.basis[size].color.hex };

            }
            
           
         }`)
};

${ props => props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
            background-image : url('${ props.asset[size].fileName ? `${props.assetsDirectory  || ''}${  props.asset[size].fileName }` : '' }');
            background-size : cover;
         }`)
    };
 
`;

export const Text = styled.p.attrs(props => ({
    responsive: props.responsive,
    typography: props.typography,
    basis: props.basis,
    border : props.border
}))`
   ${ props => props.responsive.map(size => `
        z-index : 2;
        width : 100%;
        @media ${ device[size] } {
            color:${props.typography[size].color.rgb ? `rgba(${props.typography[size].color.rgb},${props.typography[size].opacity.value})` : props.typography[size].color.hex };
            
            ${ props.typography ? generateFontProperties(props.typography, size) : '' }
            ${ props.basis ? generatePadding(props.basis, size) : '' }    
            ${ props.border ?  generateBorder(props.border, size) : '' }        
            ${ props.border ?
    ( props.border[size].color ?
        `border-color :${ props.border[size].color.rgb ? `rgba(${props.border[size].color.rgb},${props.border[size].opacity.value});`
            : `${props.border[size].color.hex};`}` : '')
    : ''}
        }`)
    }; 
`;


export const Content = styled.div.attrs(props => ({
    responsive: props.responsive,
    typography: props.typography,
    basis: props.basis
}))`
   ${ props => props.responsive.map(size => `
        z-index : 2;
        width : 100%;
         @media ${ device[size] } {
            color:${ props.typography[size].color.rgb ? `rgba(${props.typography[size].color.rgb},${props.typography[size].opacity.value})` : props.typography[size].color.hex};
            
            ${ props.typography ? generateFontProperties(props.typography, size) : '' }
            ${ props.basis ? generatePadding(props.basis, size) : '' }  
         }`)
    };
`;

export const ImageContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    border: props.border
}))`
    overflow : hidden;
    border-style : solid;
    z-index : 2;
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
         
            ${ props.basis ? generateSize(props.basis, size) : '' }      
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' }   
            ${ props.border ? generateBorder(props.border, size) : '' }   
            
            ${ props.border[size].color ? `border-color :${ props.border[size].color.rgb ? `rgba(${props.border[size].color.rgb},${props.border[size].opacity.value});` : `${props.border[size].color.hex};`}` : ''}
                
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


export const CTA = styled.a.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    typography: props.typography,
    border: props.border,
    icon: props.icon
}))`
    transition : all 0.25s ease;
    border-style : solid;
    display : flex;
    align-items: center;
    z-index : 2;
    
    & p, & i{
       transition : all 0.25s ease;
    }
    
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            background-color:${ props.basis[size].color.basic.rgb ? `rgba(${props.basis[size].color.basic.rgb},${props.basis[size].opacity.basic.value})` : props.basis[size].color.basic.hex };

            ${ props.basis ? generateSize(props.basis, size) : '' } 
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
            ${ props.border ? generateBorder(props.border, size) : '' }  

         
            align-self:${ props.basis[size].alignment.horizontal || '' };
            box-shadow : ${ props.basis[size].shadow.value || '' };
            ${ props.border[size].color.basic ? `border-color :${ props.border[size].color.basic.rgb ?
    `rgba(${props.border[size].color.basic.rgb},${props.border[size].opacity.basic.value});`
    : `${props.border[size].color.basic.hex};`}`
    : ''}
            
         
            & i {
                color:${ props.icon[size].color.basic.rgb ? `rgba(${props.icon[size].color.basic.rgb},${props.icon[size].opacity.basic.value})` : props.icon[size].color.basic.hex };
                
                ${ props.icon ? generateFontProperties(props.icon, size) : '' }
                ${ props.icon ? generatePadding(props.icon, size) : '' }
            }
         
            & p {
                width : 100%;
                color:${ props.typography[size].color.basic.rgb ? `rgba(${props.typography[size].color.basic.rgb},${props.typography[size].opacity.basic.value})` : props.typography[size].color.basic.hex};
                
                ${ props.typography ? generateFontProperties(props.typography, size) : '' }
            }
         
            &:hover{
                background-color:${ props.basis[size].color.hover.rgb ? `rgba(${props.basis[size].color.hover.rgb},${props.basis[size].opacity.hover.value})` : props.basis[size].color.hover.hex };
                border-color : ${ props.border[size].color.hover.rgb ? `rgba(${props.border[size].color.hover.rgb},${props.border[size].opacity.hover.value})` : props.border[size].color.hover.hex };     
               
                & p{
                    color:${ props.typography[size].color.hover.rgb ? `rgba(${props.typography[size].color.hover.rgb},${props.typography[size].opacity.hover.value})` : props.typography[size].color.hover.hex };
                }
               
                & i {
                    color:${ props.icon[size].color.hover.rgb ? `rgba(${props.icon[size].color.hover.rgb},${props.icon[size].opacity.hover.value})` : props.icon[size].color.hover.hex};
                }
            }
            
            &.disabled{
                cursor : default;
                background-color:${ props.basis[size].color.disabled.rgb ? `rgba(${props.basis[size].color.disabled.rgb},${props.basis[size].opacity.disabled.value})` : props.basis[size].color.disabled.hex };
                border-color : ${ props.border[size].color.disabled.rgb ? `rgba(${props.border[size].color.disabled.rgb},${props.border[size].opacity.disabled.value})` : props.border[size].color.disabled.hex };     
              
                & p{
                    color:${ props.typography[size].color.disabled.rgb ? `rgba(${props.typography[size].color.disabled.rgb},${props.typography[size].opacity.disabled.value})` : props.typography[size].color.disabled.hex };
                }
               
                & i {
                    color:${ props.icon[size].color.disabled.rgb ? `rgba(${props.icon[size].color.disabled.rgb},${props.icon[size].opacity.disabled.value})` : props.icon[size].color.disabled.hex}; 
                }
               
                &:hover{
                    background-color:${ props.basis[size].color.disabled.rgb ? `rgba(${props.basis[size].color.disabled.rgb},${props.basis[size].opacity.disabled.value})` : props.basis[size].color.disabled.hex };
                    border-color : ${ props.border[size].color.disabled.rgb ? `rgba(${props.border[size].color.disabled.rgb},${props.border[size].opacity.disabled.value})` : props.border[size].color.disabled.hex };     
              
                    & p{
                        color:${ props.typography[size].color.disabled.rgb ? `rgba(${props.typography[size].color.disabled.rgb},${props.typography[size].opacity.disabled.value})` : props.typography[size].color.disabled.hex };
                    }
                   
                    & i {
                        color:${ props.icon[size].color.disabled.rgb ? `rgba(${props.icon[size].color.disabled.rgb},${props.icon[size].opacity.disabled.value})` : props.icon[size].color.disabled.hex};
                    }
                }
            }
        }`)};
`;