import styled from 'styled-components';
import {device} from "../../styles/constants";
import {
    generatePadding,
    getFormatedColor,
    generateFontProperties,
    generateBackgroundImage,generateBackgroundImageWebp,
    generateSize
} from "../../utils/StyleGenerator";
import {ContainerCommon, ImageContainerCommon, TextCommon} from "../../styles/common.styled";
import {isNumber} from "../../utils/functions";

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


export const ContainerBanner = styled(ContainerCommon).attrs(props => ({
    responsive: props.responsive,
    basisHeader : props.basisHeader,
}))`
    width : 100%;
    max-width : 1280px;
    position : relative;
    height : 0;
    overflow : visible;
    background-color : transparent;
    border-color : transparent;
    z-index : 5;
    align-items : flex-end;
    padding-top : 0;
    padding-bottom : 0;
    align-self : center;
    
     &:after{
         background-color : transparent;
         background : transparent;
         background-image : none;
     }
     
    @media  (max-width: 1023px) {
        align-items : flex-end;
    }
    
    @media (min-width: 768px) {
       position : absolute;
       bottom : 0;
    }
    
    ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${props.basisHeader && props.basisHeader[size].padding.left && props.basis && props.basis[size].size.width !== '' ? `
                width : calc(${ isNumber(props.basis[size].size.width) ? `${ props.basis[size].size.width }px;` : props.basis[size].size.width} - ${ props.basisHeader[size].padding.left}px);
            ` : ''}
            ${props.basisHeader && props.basisHeader[size].padding.left ? `
                max-width : calc(${ isNumber(props.basis[size].size.maxWidth) ? `${ props.basis[size].size.maxWidth }px;` : props.basis[size].size.maxWidth} - ${ props.basisHeader[size].padding.left}px);
            ` : ''}
         }`
    )}
    
    @media (max-width: 768px) {
       padding : 0;
       width : 100%;
       max-width : 100%;
    }
    
   
    
`

export const PromotionBanner = styled(ContainerCommon)`
  flex-direction: row;
  align-items: center;
  justify-content : space-between;
  height : 50px;
  min-height : 50px;
  width : 250px;
  right : 0;
  transform : translateY(-50px);
 
  
  &>${TextCommon}{
    text-transform : uppercase;
    transform-origin : left;
    width : auto;
    margin-left : 10px;
  }
   
   @media  (max-width: 1023px) {
        width : 215px;
    }
    @media (max-width: 768px) {
       width : 100%;
    }
   
   
`;

export const Header = styled(ContainerCommon)`
   justify-content: center;
   z-index : 2;
   position : relative;
   align-items : flex-start;
    justify-content  : center;
    
    ${ props =>  props.responsiveContent ? ['M'].map((size, i) => `
         @media ${ device[size] } {
         
                &:before{
                   z-index : 1;
                   position : absolute;
                   width : 100%;
                   ${ props.basis[size].padding &&  props.basis[size].padding.top ? `
                      height:${ props.basis[size].padding.top  }px;
                    ` : 'height : 0;'}
                   content : ''; 
                   ${ props.basis[size].background &&  props.basis[size].background.top ? `
                      top:${ props.basis[size].background.top  }px;
                    ` : 'top : 0;'}
                   left : 0;
                   ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}  

                }
                .webp &:before{
                   ${ props.asset ? generateBackgroundImageWebp(props.asset, size, props.assetsDirectory) : ''}  
                }
                
                background-image : none;
         }`) : ''
    };
   
   
   
`;


export const Contain = styled.div`
    z-index : 2;
    
    ${ props =>  ['T', 'D'].map((size, i) => `
         @media ${ device[size] } {
            width : calc(100% / 3);
         }`)
    };
    
    ${ props =>  ['M'].map((size, i) => `
         @media ${ device[size] } {
            width : 100%;
         }`)
    };
    
`
export const Main = styled(ContainerCommon)`
 display : flex;
 flex-direction : row;
 max-width : 1280px;
 overflow : visible;

 
 &>div{
    z-index : 2;
 }

 
 &>div:nth-child(1){
    padding-right : 40px;
    width : calc(100% - 250px);
 
 }
 &>div:nth-child(2){
    width : 250px;
    position : relative;
 
 }
 
 @media  (max-width: 1023px) {
    flex-direction : column;
    &>div:nth-child(1){
        width : 100%;
        padding-right : 0px;
     
     }
     &>div:nth-child(2){
        width : 100%;
        display : flex;
        flex-direction : column;
     
     }
 }
 
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
            padding-left : 1.5em;
            
            & li{
                list-style : circle;
            }
         }
         
         & iframe{
            margin-top : 40px;
            max-width : 100%;
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
 
 ${ props =>  props.responsiveContent ? ['M'].map((size, i) => `
         @media ${ device[size] } {
            padding-left : 0;
            padding-right : 0;
              
         }`) : ''
    };
 
`;

export const Block = styled(ContainerCommon)``;

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
   //width : 100%;
   height :auto;
   display : flex;
   flex-direction : column;
   position : relative;
   overflow : hidden;
   //max-width : 1280px;
   align-self : center;
   
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            ${ props.basis ? generatePadding(props.basis, size) : '' } 
            ${ props.basis ? generateSize(props.basis, size) : '' } 
         
         }`)
    };
 
`;

