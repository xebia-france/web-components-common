import styled from 'styled-components';
import {ContainerCommon ,ContentCommon, TextCommon, ImageContainerCommon, CTACommon } from '../../styles/common.styled';
import {device} from "../../styles/constants";
import {generateMargin, generateBorder, generatePadding, generateSize, getFormatedColor} from "../../utils/StyleGenerator";

export const Container = styled(ContainerCommon)`
    flex-direction : row;
    
     @media  ${ device.M }{
        flex-direction : column;
     }
`;
export const RightContent = styled.div`
   z-index : 2;
`;

export const Text = styled(TextCommon)``;

export const Content = styled(ContentCommon)``;

export const ImageContainer = styled(ImageContainerCommon)``;

export const CTA = styled(CTACommon)``;


export const ImageBackground = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    responsiveContent: props.responsiveContent,
    asset : props.asset,
    assetsDirectory : props.assetsDirectory
}))`
    overflow : hidden;
   // -webkit-mask-image: -webkit-radial-gradient(white, black);
    border-style : solid;
    z-index : 2;
    
    ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.basis ? generateSize(props.basis, size) : '' }      
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' }   
            ${ props.border ? generateBorder(props.border, size) : '' } 
            ${ props.border ?
                ( props.border[size].color ? `border-color : ${ getFormatedColor(props.border[size].color, props.border[size].opacity ) }; ` : '' )
            : ''}
               
            align-self:${ props.basis[size].alignment.horizontal || '' };
          
         }`)
    }; 
    
    ${ props =>  `
        
            background-image : url(${ `${ props.assetsDirectory  || ''}${  props.asset }`});    
            background-size : cover;
            background-position : center;
            background-position : top left;
            background-repeat : no-repeat;
         }
         }`
    };
         
   &>img{
        width : 100%; 
   }     
`;
