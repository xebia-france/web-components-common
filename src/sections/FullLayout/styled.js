import styled from 'styled-components';
import {device} from "../../styles/constants";
import {
    generatePadding,
    generateBorder
} from "../../utils/StyleGenerator";
export const Wrapper = styled.section.attrs(props => ({
    responsive: props.responsive,
    basis : props.basis

}))`
  display : flex;
  flex-direction : column;
  width: 100%;
  
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            ${ props.basis ? generatePadding(props.basis, size) : '' } 
            ${ props.border ?  generateBorder(props.border, size) : '' }        
            ${ props.border ? 
                    ( props.border[size].color ? 
                        `border-color :${ props.border[size].color.rgb ? `rgba(${props.border[size].color.rgb},${props.border[size].opacity.value});` 
                                                                        : `${props.border[size].color.hex};`}` : '')
             : ''}
            
             background-color:${ `rgba(${props.basis[size].color.rgb},${props.basis[size].opacity.value})` };
         }`)
    }; 
`;