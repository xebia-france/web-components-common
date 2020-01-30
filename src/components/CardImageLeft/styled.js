import styled from 'styled-components';
import {ContainerCommon ,ContentCommon, TextCommon, ImageContainerCommon, CTACommon } from '../../styles/common.styled';
import {device} from "../../styles/constants";

export const Container = styled(ContainerCommon)`
    flex-direction : row;
    
     @media  ${ device.M }{
        flex-direction : column;
     }
`;

export const Text = styled(TextCommon)``;

export const Content = styled(ContentCommon)``;

export const ImageContainer = styled(ImageContainerCommon)``;

export const CTA = styled(CTACommon)``;