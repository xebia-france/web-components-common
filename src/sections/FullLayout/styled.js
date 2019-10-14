import styled from 'styled-components';
import {device} from "../../styles/constants";

export const Wrapper = styled.section.attrs(props => ({
    responsive: props.responsive,
    colorElement: props.colorElement

}))`
  display : flex;
  flex-direction : column;
  width: 100%;
  
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             background-color:${ props.colorElement[size].hex };
         }`)
    }; 
`;