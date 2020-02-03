import styled from 'styled-components';
import { device } from '../../styles/constants';
import {ContainerCommon, ContentCommon, CTACommon, ImageContainerCommon, TextCommon} from "../../styles/common.styled";

export const Container = styled(ContainerCommon)`
    align-items : flex-start;
    justify-content  : flex-start;
`;

export const CallToActions = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
    transition : all 0.25s ease;
    border-style : solid;
    display : flex;
    align-items: center;
    z-index : 2;
    flex-wrap : wrap;
    
    & p, & i{
       transition : all 0.25s ease;
    }
    
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            justify-content:${ props.basis[size].alignment.horizontal || '' };
        }`)};
`;

export const Text = styled(TextCommon)``;

export const Content = styled(ContentCommon)``;

export const ImageContainer = styled(ImageContainerCommon)``;

export const CTA = styled(CTACommon)``;