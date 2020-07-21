import styled from 'styled-components';
import {device} from '../../styles/constants';
import {generatePadding, generateSize, generateMargin, getFormatedColor, generateBackgroundImage, getFormatedSizeProperty, generateBackgroundImageWebp} from "../../utils/StyleGenerator";
import {TextCommon} from "../../styles/common.styled";

export const ImageCorner = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    index : props.index
}))`
    position : absolute;
    z-index : 2;
    
    ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.basis[size].size &&  props.basis[size].size[props.index] ?
    `
                ${getFormatedSizeProperty('width', props.basis[size].size[props.index])}
                ${getFormatedSizeProperty('height', props.basis[size].size[props.index])}
                ${getFormatedSizeProperty('max-width', props.basis[size].size[props.index])}
                ${getFormatedSizeProperty('max-height', props.basis[size].size[props.index])}
                ${getFormatedSizeProperty('min-width', props.basis[size].size[props.index])}
                ${getFormatedSizeProperty('min-height', props.basis[size].size[props.index])}
                `
    : ''
    }
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
            background-color: ${ getFormatedColor(props.basis[size].color, props.basis[size].opacity) };
            ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background:${ props.basis[size].color.gradient  };

               ` : ''}
         }`)
    }; 
`;

export const Text = styled(TextCommon)``;

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
            ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''} 
         
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
         }`)
    };             
`;
