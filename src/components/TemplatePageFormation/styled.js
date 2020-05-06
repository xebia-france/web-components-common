import styled from 'styled-components';
import {device} from "../../styles/constants";
import {
    generatePadding,
    generateBorder,
    generateBackgroundImage,
    getFormatedColor,
    generateSize,
    generateFontProperties,
    generateMargin,
    getFormatedSizeProperty
} from "../../utils/StyleGenerator";
import {ContainerCommon, ContentCommon, CTACommon, ImageContainerCommon, TextCommon} from "../../styles/common.styled";

export const Container = styled.section.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    basis: props.basis,
    border: props.border,
    asset: props.asset,
    assetsDirectory: props.assetsDirectory

}))`
  display : flex;
  flex-direction : column;
  width: 100%;  
  position : relative;
  overflow : hidden;
  align-items : center;
`;


export const Header = styled(ContainerCommon)`
   justify-content: center;
   z-index : 2;
   
   &>div{
    max-width : 900px;
   }
   
`;

export const Main = styled(ContainerCommon)`
 display : flex;
 flex-direction : row;
 max-width : 1280px;
 
 &>div{
    z-index : 2;
 }

 
 &>div:nth-child(1){
    padding-right : 40px;
    width : calc(100% - 300px);
 
 }
 &>div:nth-child(2){
    width : 300px;
 
 }
 
 @media  (max-width: 1023px) {
    flex-direction : column;
    &>div:nth-child(1){
        width : 100%;
     
     }
     &>div:nth-child(2){
        width : 100%;
        display : flex;
        flex-direction : column;
     
     }
 }
 
`;

export const Partnership = styled(ContainerCommon)`
 
 
`;

export const Text = styled(TextCommon)``;

export const Content = styled.div.attrs(props => ({
    responsive: props.responsive,
    typographyHeading1 : props.typographyHeading1,
    basisHeading1 : props.basisHeading1,
    typographyHeading2 : props.typographyHeading2,
    basisHeading2 : props.basisHeading2 ,
    typographyHeading3 : props.typographyHeading3,
    basisHeading3 : props.basisHeading3,
    typographyBold: props.typographyBold,
    typography: props.typography,
    basis: props.basis,
    basisBold: props.basisBold,
    typographyLink: props.typographyLink,
    basisLink: props.basisLink

}))`
  z-index : 2;

${ props => props.responsive.map(size => `
         
         & ul{
            list-style-type : circle;
            padding-left : 1em;
            
            & li{
                list-style : circle;
            }
         }

         @media ${ device[size] } {
             color:${ getFormatedColor(props.typography[size].color, props.typography[size].opacity) };
            ${ props.typography ? generateFontProperties(props.typography, size) : '' }
            
            &>*{
               ${ props.typography ? generateFontProperties(props.typography, size) : '' }
               ${ props.basis ? generatePadding(props.basis, size) : '' } 
            }
         
            & strong{
               ${ props.typographyBold ? `color:${ getFormatedColor(props.typographyBold[size].color, props.typographyBold[size].opacity) };` : ''}
               ${ props.typographyBold ? generateFontProperties(props.typographyBold, size) : '' }
                //${ props.basisBold ? generatePadding(props.basisBold, size) : '' } 
                //   ${ props.typographyBold ? generateFontProperties(props.typographyBold, size) : '' }
            }
            
            & a{
                ${ props.typographyLink ? `color:${ getFormatedColor(props.typographyLink[size].color, props.typographyLink[size].opacity) };` : ''}              
                ${ props.typographyLink ? generateFontProperties(props.typographyLink, size) : '' }
                //${ props.basisLink ? generatePadding(props.basisLink, size) : '' } 
                //   ${ props.typographyLink ? generateFontProperties(props.typographyLink, size) : '' }
            }
            
            & h1{
            
                ${ props.typographyHeading1 ? `color:${ getFormatedColor(props.typographyHeading1[size].color, props.typographyHeading1[size].opacity) };` : ''}
                ${ props.typographyHeading1 ? generateFontProperties(props.typographyHeading1, size) : '' }
                ${ props.basisHeading1 ? generatePadding(props.basisHeading1, size) : '' } 
            
            }
            
            & h2{
            
                ${ props.typographyHeading2 ? `color:${ getFormatedColor(props.typographyHeading2[size].color, props.typographyHeading2[size].opacity) };` : ''}
                ${ props.typographyHeading2 ? generateFontProperties(props.typographyHeading2, size) : '' }
                ${ props.basisHeading2 ? generatePadding(props.basisHeading2, size) : '' } 
            
            }
            
            & h3{
            
                ${ props.typographyHeading3 ? `color:${ getFormatedColor(props.typographyHeading3[size].color, props.typographyHeading3[size].opacity) };` : ''}
                ${ props.typographyHeading3 ? generateFontProperties(props.typographyHeading3, size) : '' }
                ${ props.basisHeading3 ? generatePadding(props.basisHeading3, size) : '' } 
            
            }
            
            
         }`)
    };

`;

export const ImageContainer = styled(ImageContainerCommon)``;


export const Blocks = styled(ContainerCommon)`
 display : flex;
 flex-direction : row;
 flex-wrap : wrap;
 max-width : 1280px;
 width : 100%;
 
`;

export const Block = styled(ContainerCommon)``;

export const ContentBlock = styled(Content).attrs(props => ({
    responsive: props.responsive,
    typography: props.typography

}))`
  z-index : 2;

${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            & strong, & a{
              color:${ getFormatedColor(props.typography[size].color, props.typography[size].opacity) };
            }
         }`)
    };
`;
export const Trainers = styled(ContainerCommon)`
 max-width : 1280px;
 
 &>div:not(:last-child){
    margin-bottom : 20px;
 }
 
`;


export const PartnershipList = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
}))`
   width : 100%;
   height :auto;
   display : flex;
   flex-direction : column;
   position : relative;
   overflow : hidden;
   max-width : 1280px;
   align-self : center;
   
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            ${ props.basis ? generatePadding(props.basis, size) : '' } 
         
         }`)
    };
 
`;