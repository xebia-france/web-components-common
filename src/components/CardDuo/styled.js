import styled from 'styled-components';
import { device } from '../../styles/constants';
import {
    generateSize,
    generatePadding,
    generateMargin,
    generateBackgroundImage,
    getFormatedColor,
    generateBackgroundImageWebp, generateBackground
} from '../../utils/StyleGenerator';
import {ContainerCommon, ImageContainerCommon} from "../../styles/common.styled";

export const Container = styled.div``;

export const SubContainer = styled.div`
   z-index : 2;
   width : 100%;
   height : 100%;
`;
export const PrevContainer = styled.div`
    display : flex;
`;

export const Card = styled(ContainerCommon)`
   flex-direction : row;
   align-content : flex-start;
   justify-content : flex-start;
`;

export const Between = styled.div.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    asset : props.asset,
    assetsDirectory : props.assetsDirectory,
    basis : props.basis,
    basisParent : props.basisParent

}))`
   width : 100%;
   height :auto;
   display : flex;
   position : relative;
   
   ${ props => props.responsive.map((size) => `
         @media ${ device[size] } {
         
            ${ props.basis ? generateSize(props.basis, size) : '' } 
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' }  
            ${props.basisParent ?  generateBackground(props.basisParent, size) : ''}
            
            &>div{
               width : 100%;
               height : 100%;
               ${props.basis ? generateBackground(props.basis, size) : ''}
               background-color: ${ getFormatedColor(props.basis[size].color, props.basis[size].opacity) }; 
            }
         }`)
    };

    ${ props => props.responsiveContent.map((size, i) => `
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
         }`)
    };
 
`;

export const ImageContainer = styled(ImageContainerCommon)``;
