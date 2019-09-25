import styled from 'styled-components';
import {device, gutter} from "../../styles/constants";

export const Wrapper = styled.section.attrs(props => ({
    responsive: props.responsive,
    color: props.color

}))`
  display : flex;
  flex-direction : column;
  width: 100%;  
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             padding: 0 ${ gutter[size] }px;
             background-color:${ props.color[size].hex };
         }`)
    }; 
`;

export const Container = styled.div`
    max-width : 1280px;
    margin: auto;
    width : inherit;
`;

