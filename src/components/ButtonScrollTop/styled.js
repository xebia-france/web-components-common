import styled from 'styled-components';
import {ContainerCommon, ImageContainerCommon} from "../../styles/common.styled";

export const Container = styled(ContainerCommon)`
   position: fixed;
   bottom : 0;
   right : 0;
   cursor : pointer;
   z-index : 30;
   transition : opacity .2s ease;
   opacity : 0;
   
   &.display{
        opacity : 1;
   }
   
   &:before{
    transition : opacity .2s cubic-bezier(.25,.46,.45,.94) 0ms;
   }
    
   &:hover{
        &:before{
            opacity : 0.7;
        }
   }
`;


export const ImageContainer = styled(ImageContainerCommon)`
    z-index : 31;
    position : relative; 
`;

