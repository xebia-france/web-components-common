import styled from 'styled-components';
import {ContainerCommon ,ContentCommon, TextCommon, ImageContainerCommon, CTACommon } from '../../styles/common.styled';
import { device} from "../../styles/constants";
import {isNumber} from "../../utils/functions";
import {generateSize} from "../../utils/StyleGenerator";

export const Container = styled(ContainerCommon)``;

export const Text = styled(TextCommon)``;

export const Content = styled(ContentCommon)``;

export const ImageContainer = styled(ImageContainerCommon)``;

export const CTA = styled(CTACommon)``;

export const Iframe = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
    width : 100%;
    height : auto;
    z-index : 10;
    display : flex;
    flex-direction: column;
    align-items: center;
    
    ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
                ${ props.basis ? `
                    & iframe {
                        ${ props.basis ? generateSize(props.basis, size) : '' }
                    }
                
                `       
              : ''}
         }`)
    };
`