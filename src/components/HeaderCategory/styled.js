import styled from 'styled-components';
import {ContainerCommon, ImageContainerCommon, CTACommon, TextCommon, ContentCommon} from '../../styles/common.styled';
import {device} from "../../styles/constants";
import { generateBackgroundImage, generateBackgroundImageWebp} from "../../utils/StyleGenerator";

export const Container = styled(ContainerCommon)`
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
                }
                
                .no-webp &:before{
                   ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}  
                }
                .webp &:before{
                   ${ props.asset ? generateBackgroundImageWebp(props.asset, size, props.assetsDirectory) : ''}  
                }
         
                background-image : none;
         }`) : ''
    };
`;


export const ImageContainer = styled(ImageContainerCommon)``;

export const CTA = styled(CTACommon)``;


export const TextHeading = styled(TextCommon)`
    ${  ['T', 'D'].map((size, i) => `
         @media ${ device[size] } {
           text-shadow: 0px 0px 6px rgb(0,0,0,60%);
         }`)
    };
`;

export const ContentHeading = styled(ContentCommon)`
    ${  ['T', 'D'].map((size, i) => `
         @media ${ device[size] } {
           &>*{
            text-shadow: 0px 0px 6px rgb(0,0,0,60%);
           }
         }`)
    };
`;

export const Contain = styled.div`
    z-index : 2;
    
    ${ ['T', 'D'].map((size, i) => `
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