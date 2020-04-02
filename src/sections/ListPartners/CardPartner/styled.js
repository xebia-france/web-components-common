import styled from 'styled-components';
import {device, size} from "../../../styles/constants";
import {
    getFormatedColor,
    generateBorder,
    generateMargin,
    generatePadding,
    generateSize, generateBackgroundImage
} from "../../../utils/StyleGenerator";
import {ImageContainerCommon} from "../../../styles/common.styled";

export const Partner = styled.div.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    asset: props.asset,
    assetsDirectory: props.assetsDirectory,
    basis: props.basis,
    border : props.border
}))`
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

    ${ props => props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
            ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}  
         }`)
    };
`;



export const ImageContainer = styled(ImageContainerCommon)``;
