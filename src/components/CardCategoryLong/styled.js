import styled from 'styled-components';
import {ContainerCommon, ImageContainerCommon } from '../../styles/common.styled';
import {device} from "../../styles/constants";
import {generateFontProperties, generatePadding, getFormatedColor} from "../../utils/StyleGenerator";

export const Container = styled(ContainerCommon)``;
export const ImageContainer = styled(ImageContainerCommon)``;

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
    
    & iframe{
        display : block;
        margin : auto;
        margin-top : 60px;
        max-width : 100%;
    }
  
    & ul{
        list-style-type : circle;
        padding-left : 1em;
        
        & li{
            list-style : circle;
        }
     }

${ props => props.responsive.map(size => `

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
