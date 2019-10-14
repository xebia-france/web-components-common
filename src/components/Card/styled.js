import styled from 'styled-components';
import { device } from '../../styles/constants';
import {isNumber} from '../../utils/functions';
import  isEmpty  from 'lodash/isEmpty'

export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    colorElement: props.colorElement

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
             background-color:${ props.colorElement[size].hex };
         }`)
}; 
`;

export const Text = styled.p.attrs(props => ({
    responsive: props.responsive,
    opacityElement: props.opacityElement,
    colorElement: props.colorElement,
    font: props.font,
    text: props.text

}))`
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            opacity:${ props.opacityElement[size].value };
            color:${ props.colorElement[size].hex };
            font-size:${ props.font[size].size }px;
            font-family : '${ props.font[size].family }', ${ props.font[size].typeface };
            font-style: ${ props.font[size].style || '' };
            font-weight: ${ props.font[size].weight[1] } ;
            letter-spacing: ${ props.font[size].letterSpacing }px;
            line-height: ${ props.font[size].lineHeight }px;
            text-align: ${ props.text[size].align };
            text-decoration: ${ props.text[size].decoration || '' };
            text-transform: ${ props.text[size].transform || '' };
         }`)
};
    
`;

export const Title = styled(Text)``;

export const Content = styled.div.attrs(props => ({
    responsive: props.responsive,
    opacityElement: props.opacityElement,
    colorElement: props.colorElement,
    font: props.font,
    text: props.text

}))`
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            opacity:${ props.opacityElement[size].value };
            color:${ props.colorElement[size].hex };
            font-size:${ props.font[size].size }px;
            font-family : '${ props.font[size].family }', ${ props.font[size].typeface };
            font-style: ${ props.font[size].style || '' };
            font-weight: ${ props.font[size].weight[1] } ;
            letter-spacing: ${ props.font[size].letterSpacing }px;
            line-height: ${ props.font[size].lineHeight }px;
            text-align: ${ props.text[size].align };
            text-decoration: ${ props.text[size].decoration || '' };
            text-transform: ${ props.text[size].transform || '' };
         }`)
    };
    
    & em {
        font-style : italic;
    }
    
    & strong {
        font-weight : 700;
    }
    
    & ol, & ul, & li{
        list-style : inside;
    }
    
`;

export const ImageContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    size: props.size
}))`
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            width:${ isNumber(props.size[size].width)
                    ? `${ props.size[size].width }px`
                    : props.size[size].width };
    
            height:${ isNumber(props.size[size].height)
    ? `${ props.size[size].height }px`
    : props.size[size].height };
            max-width: ${ isNumber(props.size[size].maxWidth)
    ? `${ props.size[size].maxWidth }px`
    : props.size[size].maxWidth || '' };
            max-height:${ isNumber(props.size[size].maxHeight)
    ? `${ props.size[size].maxHeight }px`
    : props.size[size].maxHeight || '' };
    
    
        &>img{
            ${  isEmpty(props.size[size].width) ? `
                width : auto;
                height : 100%;    
            
            
            ` : `
                width : 100%;
                height : auto;
            `  }
    
        } 
    
    
    
    }
         
       
         
         
   `) }; 
         
       
`;