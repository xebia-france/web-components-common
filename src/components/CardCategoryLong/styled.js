import styled from 'styled-components';
import {ContainerCommon, ImageContainerCommon } from '../../styles/common.styled';
import {device} from "../../styles/constants";
import {generateFontProperties, generatePadding, generateTextColor} from "../../utils/StyleGenerator";

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
            ${ props.typography ?  generateTextColor(props.typography, size)  : ''}
            ${ props.typography ? generateFontProperties(props.typography, size) : '' }
            
            &>*{
               ${ props.typography ? generateFontProperties(props.typography, size) : '' }
               ${ props.basis ? generatePadding(props.basis, size) : '' } 
            }
         
            & strong{
                ${props.typographyBold ? generateTextColor(props.typographyBold, size) : ''}
               ${ props.typographyBold ? generateFontProperties(props.typographyBold, size) : '' }
                //${ props.basisBold ? generatePadding(props.basisBold, size) : '' } 
                //   ${ props.typographyBold ? generateFontProperties(props.typographyBold, size) : '' }
            }
            
            & a{
                ${props.typographyLink  ? generateTextColor(props.typographyLink , size) : ''}
                ${ props.typographyLink ? generateFontProperties(props.typographyLink, size) : '' }
                //${ props.basisLink ? generatePadding(props.basisLink, size) : '' } 
                //   ${ props.typographyLink ? generateFontProperties(props.typographyLink, size) : '' }
            }
            
            & h1{
                ${props.typographyHeading1 ? generateTextColor(props.typographyHeading1, size) : ''}
                ${ props.typographyHeading1 ? generateFontProperties(props.typographyHeading1, size) : '' }
                ${ props.basisHeading1 ? generatePadding(props.basisHeading1, size) : '' } 
            
            }
            
            & h2{
                ${props.typographyHeading2 ? generateTextColor(props.typographyHeading2, size) : ''}
                ${ props.typographyHeading2 ? generateFontProperties(props.typographyHeading2, size) : '' }
                ${ props.basisHeading2 ? generatePadding(props.basisHeading2, size) : '' } 
            
            }
            
            & h3{
                ${props.typographyHeading3 ? generateTextColor(props.typographyHeading3, size) : ''}
                ${ props.typographyHeading3 ? generateFontProperties(props.typographyHeading3, size) : '' }
                ${ props.basisHeading3 ? generatePadding(props.basisHeading3, size) : '' } 
            }
         }`)
    };
`;
