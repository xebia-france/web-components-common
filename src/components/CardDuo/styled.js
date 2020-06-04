import styled from 'styled-components';
import { device } from '../../styles/constants';
import {
    generateSize,
    generatePadding,
    generateMargin,
    generateBackgroundImage,
    getFormatedColor,
    generateBackgroundImageWebp
} from '../../utils/StyleGenerator';
import {ContainerCommon, ContentCommon, CTACommon, ImageContainerCommon, TextCommon} from "../../styles/common.styled";

export const Container = styled.div``;

export const SubContainer = styled.div`
   z-index : 2;
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
            background-color: ${ getFormatedColor(props.basisParent[size].color,props.basisParent[size].opacity) }; 
            
            &>div{
               width : 100%;
               height : 100%;
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
               ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}  
            }
            .webp &:before{
               ${ props.asset ? generateBackgroundImageWebp(props.asset, size, props.assetsDirectory) : ''}  
            }       
         }`)
    };
 
`;

export const Text = styled(TextCommon)``;

export const Content = styled(ContentCommon)``;

export const ImageContainer = styled(ImageContainerCommon)``;

export const CTA = styled(CTACommon)``;