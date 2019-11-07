import styled from 'styled-components';
import { device } from '../../styles/constants';
import {isNumber} from '../../utils/functions';
import  isEmpty  from 'lodash/isEmpty'

export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis : props.basis

}))`
   width : 100%;
   height :auto;
   display : flex;
   flex-direction : column;
   align-items : center;
   justify-content  : center;
   padding : 10px;
   
   
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            background-color:${ `rgba(${props.basis[size].color.rgb},${props.basis[size].opacity.value})` };
              
            width:${ isNumber(props.basis[size].size.width)
                    ? `${ props.basis[size].size.width }px`
                    : props.basis[size].size.width };
    
            height:${ isNumber(props.basis[size].size.height)
                    ? `${ props.basis[size].size.height }px`
                    : props.basis[size].size.height };
            max-width: ${ isNumber(props.basis[size].size.maxWidth)
                    ? `${ props.basis[size].size.maxWidth }px`
                    : props.basis[size].size.maxWidth || '' };
            max-height:${ isNumber(props.basis[size].size.maxHeight)
                    ? `${ props.basis[size].size.maxHeight }px`
                    :props.basis[size].size.maxHeight || '' };
                                
            padding-top : ${ props.basis[size].padding.top }px;
            padding-bottom : ${ props.basis[size].padding.bottom }px;
            padding-left : ${ props.basis[size].padding.left }px;
            padding-right : ${ props.basis[size].padding.right }px;
             
            margin-top : ${ props.basis[size].margin.top }px;
            margin-bottom : ${ props.basis[size].margin.bottom }px;
            margin-left : ${ props.basis[size].margin.left }px;
            margin-right : ${ props.basis[size].margin.right }px;
              
         }`)
}; 
`;

export const Text = styled.p.attrs(props => ({
    responsive: props.responsive,
    typography : props.typography
}))`
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            color:${ `rgba(${props.typography[size].color.rgb},${props.typography[size].opacity.value})` };
            font-size:${ props.typography[size].font.size }px;
            font-family : '${ props.typography[size].font.family }', ${props.typography[size].font.typeface };
            font-style: ${ props.typography[size].font.style || '' };
            font-weight: ${ props.typography[size].font.weight[1] } ;
            letter-spacing: ${ props.typography[size].font.letterSpacing }px;
            line-height: ${ props.typography[size].font.lineHeight }px;
            text-align: ${ props.typography[size].text.align };
            text-decoration: ${ props.typography[size].text.decoration || '' };
            text-transform: ${props.typography[size].text.transform || '' };
         }`)
};
`;

export const Title = styled(Text)``;

export const Content = styled.div.attrs(props => ({
    responsive: props.responsive,
    typography : props.typography
}))`
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            color:${ `rgba(${props.typography[size].color.rgb},${props.typography[size].opacity.value})` };
            font-size:${ props.typography[size].font.size }px;
            font-family : '${ props.typography[size].font.family }', ${props.typography[size].font.typeface };
            font-style: ${ props.typography[size].font.style || '' };
            font-weight: ${ props.typography[size].font.weight[1] } ;
            letter-spacing: ${ props.typography[size].font.letterSpacing }px;
            line-height: ${ props.typography[size].font.lineHeight }px;
            text-align: ${ props.typography[size].text.align };
            text-decoration: ${ props.typography[size].text.decoration || '' };
            text-transform: ${props.typography[size].text.transform || '' };
         }`)
    };
   
`;