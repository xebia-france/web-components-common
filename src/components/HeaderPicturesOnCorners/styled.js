import styled from 'styled-components';
import {device} from '../../styles/constants';
import {isNumber} from '../../utils/functions';

export const ImageCorner = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
    position : absolute;
    z-index : 0;
    
    ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
        
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
    : props.basis[size].size.maxHeight || '' };
         
         }`)
    }; 
         
   &>img{
        width : 100%; 
   }     
`;

export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis

}))`
   width : 100%;
   height : 100vh;
   position:relative;
   display : flex;
   flex-direction : column;
   align-items : center;
   justify-content  : center;
   
   & ${ ImageCorner }{
       &:nth-child(1){
           top : 0;
           left: 0;
       }
       &:nth-child(2){
           top : 0;
           right: 0;
       }
       &:nth-child(3){
           bottom : 0;
           left: 0;
       }
       &:nth-child(4){
           bottom : 0;
           right: 0;
       }
   }
   
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            background-color:${ `rgba(${props.basis[size].color.rgb},${props.basis[size].opacity.value})` };
         }`)
    }; 
`;

export const Text = styled.p.attrs(props => ({
    responsive: props.responsive,
    typography: props.typography

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

export const Title = styled(Text)`
    padding : 0;
    margin : 0;
    z-index : 2;
`;
export const Tagline = styled(Text)`
    padding : 0;
    margin : 0;
    z-index : 2;
`;

export const Logo = styled.div.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    basis: props.basis
}))`
    background-size : 100% auto;
    background-repeat: no-repeat;
    z-index : 2;
    
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
        
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
    : props.basis[size].size.maxHeight || '' };
                                
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
        
  ${ props => props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
            background-image : url('${ props.asset[size].fileName ? `./assets/${  props.asset[size].fileName }` : '' }');
         }`)
    };             
`;
