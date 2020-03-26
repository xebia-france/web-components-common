import styled from 'styled-components';
import {device} from "../../styles/constants";
import {
    generatePadding,
    generateBorder, generateBackgroundImage
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
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             
            ${ props.basis ? generatePadding(props.basis, size) : '' }
            ${ props.border ?  generateBorder(props.border, size) : '' }        
            ${ props.border ?
    ( props.border[size].color ?
        `border-color :${ props.border[size].color.rgb ? `rgba(${props.border[size].color.rgb},${props.border[size].opacity.value});`
            : `${props.border[size].color.hex};`}` : '')
    : ''}
             
            &:before{
               z-index : 0;
               position : absolute;
               width : 100%;
               height : 100%;
               content : ''; 
               top : 0;
               left : 0;
               background-color:${ props.basis[size].color.rgb ?  `rgba(${props.basis[size].color.rgb},${props.basis[size].opacity.value})` : props.basis[size].color.hex };
            ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background:${ props.basis[size].color.gradient  };

               ` : ''}
            }
         }`)
    }; 
    
    ${ props =>  props.asset ?  props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
         ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}    
         }
         }`)
    : ''  };
`;
