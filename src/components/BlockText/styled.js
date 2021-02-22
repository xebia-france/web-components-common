import styled from 'styled-components';
import { device } from '../../styles/constants';
import { generateSize, generatePadding, generateMargin, generateBorder, getFormatedColor, generateBorderColor, generateBackground } from '../../utils/StyleGenerator';

export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis : props.basis,
    border : props.border

}))`
   width : 100%;
   height :auto;
   display : flex;
   flex-direction : column;
   align-items : center;
   justify-content  : center;   
   overflow : hidden;
   z-index : 2;
   
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            ${props.basis ? generateBackground(props.basis, size): ''}
            ${ props.basis ?  generateSize(props.basis, size) : '' }        
            ${ props.basis ?  generatePadding(props.basis, size) : '' }        
            ${ props.basis ?  generateMargin(props.basis, size) : '' }        
            ${ props.border ?  generateBorder(props.border, size) : '' }   
            ${ props.border ?  generateBorderColor(props.border, size) : '' }   
            
         }`)
}; 
`;
