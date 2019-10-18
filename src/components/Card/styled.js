import styled from 'styled-components';
import { device } from '../../styles/constants';
import {isNumber} from '../../utils/functions';
import  isEmpty  from 'lodash/isEmpty'

export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    colorElement: props.colorElement,
    paddingElement : props.paddingElement

}))`
   width : 100%;
   height :auto;
   display : flex;
   flex-direction : column;
   align-items : center;
   justify-content  : center;
   
   
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             background-color:${ props.colorElement[size].hex };
             padding-top : ${ props.paddingElement[size].top }px;
             padding-bottom : ${ props.paddingElement[size].bottom }px;
             padding-left : ${ props.paddingElement[size].left }px;
             padding-right : ${ props.paddingElement[size].right }px;
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
    size: props.size,
    border : props.border
}))`

    overflow : hidden;
    border-style : solid;
    
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
                    :props.size[size].maxWidth || '' };
            max-height:${ isNumber(props.size[size].maxHeight)
                    ? `${ props.size[size].maxHeight }px`
                    : props.size[size].maxHeight || '' };
                    
            border-color : ${ props.border[size].color.hex || '' };        
            border-top-width : ${  isNumber(props.border[size].width.top) ? `${ props.border[size].width.top }px` 
                                    : `${ props.border[size].width.top }` || '' }; 
            border-right-width : ${  isNumber(props.border[size].width.right) ? `${ props.border[size].width.right }px` 
                                    : `${ props.border[size].width.right }` || '' }; 
            border-bottom-width : ${  isNumber(props.border[size].width.bottom) ? `${ props.border[size].width.bottom }px` 
                                    : `${ props.border[size].width.bottom }` || '' }; 
            border-left-width : ${  isNumber(props.border[size].width.left) ? `${ props.border[size].width.left }px` 
                                    : `${ props.border[size].width.left }` || '' }; 
            
            border-top-left-radius :  ${  isNumber(props.border[size].radius.topLeft) ? `${ props.border[size].radius.topLeft }px` 
                                    : `${ props.border[size].radius.topLeft }` || '' };
            border-top-right-radius :  ${  isNumber(props.border[size].radius.topRight) ? `${ props.border[size].radius.topRight }px` 
                                    : `${ props.border[size].radius.topRight }` || '' };  
            border-bottom-right-radius :  ${  isNumber(props.border[size].radius.bottomRight) ? `${ props.border[size].radius.bottomRight }px` 
                                    : `${ props.border[size].radius.bottomRight }` || '' }; 
            border-bottom-left-radius :  ${  isNumber(props.border[size].radius.bottomLeft) ? `${ props.border[size].radius.bottomLeft }px` 
                                    : `${ props.border[size].radius.bottomLeft }` || '' };                         
    
        &>img{
            ${  isEmpty(props.size[size].width) ? `
                width : auto;
                height : 100%;    
            
            
            ` : ( !isEmpty(props.size[size].width) && !isEmpty(props.size[size].height) ? `
                width : 100%;
                height : 100%;
            ` : `
                width : 100%;
                height : auto;
            `)   }
        } 
    
    }
         
       
         
         
   `) }; 
         
       
`;


export const CTA = styled.div.attrs(props => ({
    responsive: props.responsive,
    opacityElement: props.opacityElement,
    font: props.font,
    text: props.text,
    size: props.size,
    basicBehavior: props.basicBehavior,
    hoverBehavior: props.hoverBehavior,
    border : props.borderElement,
    margin : props.marginElement,
    padding : props.paddingElement
}))`
    transition : all 0.25s ease;
    border-style : solid;
    
    & a{
       transition : all 0.25s ease;
    }
    
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            & a {
                color:${ `rgba(${props.basicBehavior.color[size].rgb}, ${props.basicBehavior.opacity[size].value})` };
                font-size:${ props.font[size].size }px;
                font-family : '${ props.font[size].family }', ${ props.font[size].typeface };
                font-style: ${ props.font[size].style || '' };
                font-weight: ${ props.font[size].weight[1] } ;
                letter-spacing: ${ props.font[size].letterSpacing }px;
                line-height: ${ props.font[size].lineHeight }px;
                text-align: ${ props.text[size].align };
                text-decoration: ${ props.text[size].decoration || '' };
                text-transform: ${ props.text[size].transform || '' };
            }
            
        
            background-color:${ `rgba(${props.basicBehavior.background[size].color.rgb}, ${props.basicBehavior.background[size].opacity.value})` };
            border-color:${ `rgba(${props.basicBehavior.border[size].color.rgb}, ${props.basicBehavior.border[size].opacity.value})` };
            
            border-top-width : ${  isNumber(props.border[size].width.top) ? `${ props.border[size].width.top }px` 
                                    : `${ props.border[size].width.top }` || '' }; 
            border-right-width : ${  isNumber(props.border[size].width.right) ? `${ props.border[size].width.right }px` 
                                    : `${ props.border[size].width.right }` || '' }; 
            border-bottom-width : ${  isNumber(props.border[size].width.bottom) ? `${ props.border[size].width.bottom }px` 
                                    : `${ props.border[size].width.bottom }` || '' }; 
            border-left-width : ${  isNumber(props.border[size].width.left) ? `${ props.border[size].width.left }px` 
                                    : `${ props.border[size].width.left }` || '' }; 
            
            border-top-left-radius :  ${  isNumber(props.border[size].radius.topLeft) ? `${ props.border[size].radius.topLeft }px` 
                                    : `${ props.border[size].radius.topLeft }` || '' };
            border-top-right-radius :  ${  isNumber(props.border[size].radius.topRight) ? `${ props.border[size].radius.topRight }px` 
                                    : `${ props.border[size].radius.topRight }` || '' };  
            border-bottom-right-radius :  ${  isNumber(props.border[size].radius.bottomRight) ? `${ props.border[size].radius.bottomRight }px` 
                                    : `${ props.border[size].radius.bottomRight }` || '' }; 
            border-bottom-left-radius :  ${  isNumber(props.border[size].radius.bottomLeft) ? `${ props.border[size].radius.bottomLeft }px` 
                                    : `${ props.border[size].radius.bottomLeft }` || '' };                         
    
            width:${ isNumber(props.size[size].width)
                    ? `${ props.size[size].width }px`
                    : props.size[size].width };
    
            height:${ isNumber(props.size[size].height)
                    ? `${ props.size[size].height }px`
                    : props.size[size].height };
            max-width: ${ isNumber(props.size[size].maxWidth)
                    ? `${ props.size[size].maxWidth }px`
                    :props.size[size].maxWidth || '' };
            max-height:${ isNumber(props.size[size].maxHeight)
                    ? `${ props.size[size].maxHeight }px`
                    : props.size[size].maxHeight || '' };
                    
            padding-top: ${ props.padding[size].top || '' }px ;
            padding-right: ${ props.padding[size].right || '' }px ;
            padding-bottom: ${ props.padding[size].bottom || '' }px ;
            padding-left: ${ props.padding[size].left || '' }px ;
            
            margin-top: ${ props.margin[size].top || '' }px ;
            margin-right: ${ props.margin[size].right || '' }px ;
            margin-bottom: ${ props.margin[size].bottom || '' }px ;
            margin-left: ${ props.margin[size].left || '' }px ;        
                    
                    
         
            &:hover{
               background-color:${ `rgba(${props.hoverBehavior.background[size].color.rgb}, ${props.hoverBehavior.background[size].opacity.value})` };
           
               border-color:${ `rgba(${props.hoverBehavior.border[size].color.rgb}, ${props.hoverBehavior.border[size].opacity.value})` };
               
               & a{
                color:${ `rgba(${props.hoverBehavior.color[size].rgb}, ${props.hoverBehavior.opacity[size].value})` };
               }
         
            }
         
         
         
         }`)
    };
    
`;