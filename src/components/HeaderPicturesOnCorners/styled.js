import styled from 'styled-components';
import {device} from '../../styles/constants';
import {isNumber} from '../../utils/functions';
import {generateBorder, generateFontProperties, generatePadding, generateSize, generateMargin} from "../../utils/StyleGenerator";

export const ImageCorner = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
    position : absolute;
    z-index : 0;
    
    
    ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.basis ? generateSize(props.basis, size) : '' }
         }`)
    }; 
         
   &>img{
        width : 100%; 
   }     
`;

export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis

}))`
   width : 100%;
   height : 100vh;
   position:relative;
   display : flex;
   flex-direction : column;
   align-items : center;
   justify-content  : center;
   
   & ${ ImageCorner }{
       &:nth-child(1){
           top : 0;
           left: 0;
       }
       &:nth-child(2){
           top : 0;
           right: 0;
       }
       &:nth-child(3){
           bottom : 0;
           left: 0;
       }
       &:nth-child(4){
           bottom : 0;
           right: 0;
       }
   }
   
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            background-color:${ `rgba(${props.basis[size].color.rgb},${props.basis[size].opacity.value})` };
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


export const Logo = styled.div.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    basis: props.basis,
    assets : props.asset,
    assetsDirectory : props.assetsDirectory
}))`
    background-size : 100% auto;
    background-repeat: no-repeat;
    z-index : 2;
    
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
         
            ${ props.basis ? generateSize(props.basis, size) : '' } 
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
         }`)
    }; 
        
  ${ props => props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
            background-image : url('${ props.asset[size].fileName ? `${props.assetsDirectory || ''}${  props.asset[size].fileName }` : '' }');
         }`)
    };             
`;
