import styled from 'styled-components';
import { device } from '../../styles/constants';
import { generateSize, generatePadding, generateMargin, generateFontProperties, generateBorder } from '../../utils/StyleGenerator';


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
            background-color:${ `rgba(${props.basis[size].color.rgb},${props.basis[size].opacity.value})` };
                   
            ${ props.basis ?  generateSize(props.basis, size) : '' }        
            ${ props.basis ?  generatePadding(props.basis, size) : '' }        
            ${ props.basis ?  generateMargin(props.basis, size) : '' }        
            ${ props.border ?  generateBorder(props.border, size) : '' }        
            ${ props.border ? 
                    ( props.border[size].color ? 
                        `border-color :${ props.border[size].color.rgb ? `rgba(${props.border[size].color.rgb},${props.border[size].opacity.value});` 
                                                                        : `${props.border[size].color.hex};`}` : '')
             : ''}
    

         }`)
}; 
`;

export const Text = styled.p.attrs(props => ({
    responsive: props.responsive,
    typography : props.typography,
    basis : props.basis,
    border : props.border
}))`
   ${ props => props.responsive.map(size => `
         width : 100%;
         @media ${ device[size] } {
            color:${ `rgba(${props.typography[size].color.rgb},${props.typography[size].opacity.value})` };
           
            ${ props.typography ?  generateFontProperties(props.typography, size) : '' }
            ${ props.basis ?  generatePadding(props.basis, size) : '' }  
              ${ props.border ?  generateBorder(props.border, size) : '' }        
            ${ props.border ? 
                    ( props.border[size].color ? 
                        `border-color :${ props.border[size].color.rgb ? `rgba(${props.border[size].color.rgb},${props.border[size].opacity.value});` 
                                                                        : `${props.border[size].color.hex};`}` : '')
             : ''}    

         }`)
};
`;

export const Content = styled.div.attrs(props => ({
    responsive: props.responsive,
    typography : props.typography,
    basis : props.basis
}))`

    width : 100%;
    word-break: break-word;
    
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            color:${ `rgba(${props.typography[size].color.rgb},${props.typography[size].opacity.value})` };
            
            ${ props.typography ?  generateFontProperties(props.typography, size) : '' }
            ${ props.basis ?  generatePadding(props.basis, size) : '' } 
          
            & a {
               color:${ `rgba(${props.typography[size].color.rgb},${props.typography[size].opacity.value})` };
            }
            
         }`)
    };
`;