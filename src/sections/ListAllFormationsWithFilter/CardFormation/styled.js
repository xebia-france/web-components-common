import styled from 'styled-components';
import {device} from "../../../styles/constants";
import {
    getFormatedColor,
    generateBorder,
    generateMargin,
    generatePadding,
    generateSize,
    generateBackgroundImage,
    generateBackgroundImageWebp,
    generateBackgroundImageWebpNoResponsive,
    generateBackgroundImageNoResponsive
} from "../../../utils/StyleGenerator";
import { CTACommon} from "../../../styles/common.styled";


export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    typographyCTA: props.typographyCTA,
    typographyTitle: props.typographyTitle,
}))`
    display : flex;
    position : relative;
    overflow : hidden;
   flex-direction : column;
   
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
    
           &:hover ${CTACommon}{
               
                & p{
                    color:${ getFormatedColor(props.typographyCTA[size].color.hover, props.typographyCTA[size].opacity.hover )};
                }
           }
           
           &  ${CTACommon} svg, & ${CTACommon} ${CTACommon} svg{
                width : 10px;
                margin-right : 10px;
                align-self : flex-start;
                ${ props.typographyCTA[size].font.lineHeight ?
                `height : ${ props.typographyCTA[size].font.lineHeight }px;`
                : ''}
                
                & path{
                     ${ props.typographyTitle ? `fill :  ${ getFormatedColor(props.typographyTitle[size].color, props.typographyTitle[size].opacity) };` : ''}
                }
           }
             
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

