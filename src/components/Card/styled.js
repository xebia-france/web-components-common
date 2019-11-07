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

export const ImageContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    border : props.border
}))`

    overflow : hidden;
    border-style : solid;
    
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
                    :props.basis[size].size.maxHeight || '' };
                                
            padding-top : ${ props.basis[size].padding.top }px;
            padding-bottom : ${ props.basis[size].padding.bottom }px;
            padding-left : ${ props.basis[size].padding.left }px;
            padding-right : ${ props.basis[size].padding.right }px;
             
            margin-top : ${ props.basis[size].margin.top }px;
            margin-bottom : ${ props.basis[size].margin.bottom }px;
            margin-left : ${ props.basis[size].margin.left }px;
            margin-right : ${ props.basis[size].margin.right }px;
                    
            align-self:${ props.basis[size].alignment.horizontal || '' };
                    
                    
                    
            border-color : ${ `rgba(${props.border[size].color.rgb},${props.border[size].opacity.value})` };     
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
            ${  isEmpty(props.basis[size].size.width) ? `
                width : auto;
                height : 100%;    
            
            
            ` : ( !isEmpty(props.basis[size].size.width) && !isEmpty(props.basis[size].size.height) ? `
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


export const CTA = styled.a.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    typography: props.typography,
    border: props.border,
    icon: props.icon
}))`
    transition : all 0.25s ease;
    border-style : solid;
    display : flex;
    align-items:center;
    
    & p, & i{
       transition : all 0.25s ease;
    }
    
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
             background-color:${ `rgba(${props.basis[size].color.basic.rgb},${props.basis[size].opacity.basic.value})` };
             
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
         
            align-self:${ props.basis[size].alignment.horizontal || '' };
            
            padding-top : ${ props.basis[size].padding.top }px;
            padding-bottom : ${ props.basis[size].padding.bottom }px;
            padding-left : ${ props.basis[size].padding.left }px;
            padding-right : ${ props.basis[size].padding.right }px;
             
            margin-top : ${ props.basis[size].margin.top }px;
            margin-bottom : ${ props.basis[size].margin.bottom }px;
            margin-left : ${ props.basis[size].margin.left }px;
            margin-right : ${ props.basis[size].margin.right }px;
         
            & i {
                color:${ `rgba(${props.icon[size].color.basic.rgb},${props.icon[size].opacity.basic.value})` };
                font-size:${ props.icon[size].font.size }px;
                font-family : '${ props.icon[size].font.family }', ${props.icon[size].font.typeface };
                font-weight: ${ props.icon[size].font.weight[1] } ;
                line-height: ${ props.icon[size].font.lineHeight }px;
            
                padding-top : ${ props.icon[size].padding.top }px;
                padding-bottom : ${ props.icon[size].padding.bottom }px;
                padding-left : ${ props.icon[size].padding.left }px;
                padding-right : ${ props.icon[size].padding.right }px;
                
            }
         
            & p {
                color:${ `rgba(${props.typography[size].color.basic.rgb},${props.typography[size].opacity.basic.value})` };
                font-size:${ props.typography[size].font.size }px;
                font-family : '${ props.typography[size].font.family }', ${props.typography[size].font.typeface };
                font-style: ${ props.typography[size].font.style || '' };
                font-weight: ${ props.typography[size].font.weight[1] } ;
                letter-spacing: ${ props.typography[size].font.letterSpacing }px;
                line-height: ${ props.typography[size].font.lineHeight }px;
                text-align: ${ props.typography[size].text.align };
                text-decoration: ${ props.typography[size].text.decoration || '' };
                text-transform: ${props.typography[size].text.transform || '' }; 
            }
            
        
            border-color : ${ `rgba(${props.border[size].color.basic.rgb},${props.border[size].opacity.basic.value})` };     
            
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
        
         
            &:hover{
               background-color:${ `rgba(${props.basis[size].color.hover.rgb},${props.basis[size].opacity.hover.value})` };

           
                border-color : ${ `rgba(${props.border[size].color.hover.rgb},${props.border[size].opacity.hover.value})` };     
               
               & p{
                color:${ `rgba(${props.typography[size].color.hover.rgb},${props.typography[size].opacity.hover.value})` };
               }
               
               & i {
                 color:${ `rgba(${props.icon[size].color.hover.rgb},${props.icon[size].opacity.hover.value})` };
              
               }
         
            }
         
         
         
         }`)
    };
    
`;