import styled from 'styled-components';
import {ContainerCommon} from '../../styles/common.styled';
import { device} from "../../styles/constants";
import {generateSize} from "../../utils/StyleGenerator";

export const Container = styled(ContainerCommon)``;

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