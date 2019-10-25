import styled from 'styled-components';
import {device} from "../../styles/constants";

export const Wrapper = styled.section.attrs(props => ({
    responsive: props.responsive,
    basis : props.basis

}))`
  display : flex;
  flex-direction : column;
  width: 100%;
  
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             background-color:${ `rgba(${props.basis[size].color.rgb},${props.basis[size].opacity.value})` };
         }`)
    }; 
`;