import styled from 'styled-components';
import { device } from '../../styles/constants';
import { generateSize, generatePadding, generateMargin, generateBorder, getFormatedColor } from '../../utils/StyleGenerator';

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
   
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            background-color: ${ getFormatedColor(props.basis[size].color, props.basis[size].opacity) } ;
            ${ props.basis ?  generateSize(props.basis, size) : '' }        
            ${ props.basis ?  generatePadding(props.basis, size) : '' }        
            ${ props.basis ?  generateMargin(props.basis, size) : '' }        
            ${ props.border ?  generateBorder(props.border, size) : '' }   
            ${ props.border ? 
                    ( props.border[size].color ? `border-color : ${ getFormatedColor(props.border[size].color, props.border[size].opacity ) }; ` : '' )
             : ''}  
         }`)
}; 
`;
