import styled from 'styled-components';
import {device} from '../../styles/constants';
import {isNumber} from '../../utils/functions';
import isEmpty from 'lodash/isEmpty'
import {
    generatePadding,
    generateBorder, generateBorderColor, generateBackground,
} from "../../utils/StyleGenerator";

export const Wrapper = styled.section.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    border: props.border

}))`
  display : flex;
  flex-direction : column;
  width: 100%;  
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            background-color:${ `rgba(${props.basis[size].color.rgb},${props.basis[size].opacity.value})` };
            
            ${ props.basis ? generatePadding(props.basis, size) : '' }
            ${ props.border ?  generateBorder(props.border, size) : '' }        
            ${ props.border ?  generateBorderColor(props.border, size) : '' }        
            
         }`)
    }; 
`;


export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    flex: props.flex

}))`
  max-width : 1280px;
  margin: auto;
  width : inherit;
  display : flex;
  
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             flex-direction : ${ props.flex[size].properties.direction };
             flex-wrap: ${ props.flex[size].properties.wrap };
             justify-content: ${ props.flex[size].properties.justify };
             align-items: ${ props.flex[size].properties.alignItems };
             align-content: ${ props.flex[size].properties.alignContent };
             margin-bottom : -${ props.flex[size].properties.gutterVertical }px;
             
             &>*{
                width: calc(100% / ${ props.flex[size].properties.columns } - ${   ((props.flex[size].properties.columns - 1) * props.flex[size].properties.gutterHorizontal) / props.flex[size].properties.columns }px );
                margin-bottom : ${ props.flex[size].properties.gutterVertical }px;
                
                ${props.flex[size].properties.justify === 'flex-start' ? `
                    &:not(:nth-child(${ props.flex[size].properties.columns }n) ){
                        margin-right : ${props.flex[size].properties.gutterHorizontal}px;
                    }
                    
                    `  : ''
                }
                ${props.flex[size].properties.justify === 'flex-end' ? `
                    &:not(:nth-child(${ props.flex[size].properties.columns }n + 1)){
                      margin-left : ${props.flex[size].properties.gutterHorizontal}px;
                    }
                    `  : ''
                }
                
                ${props.flex[size].properties.justify === 'center' ? `
                    &:not(:nth-child(${ props.flex[size].properties.columns }n + 1)){
                      margin-left : ${props.flex[size].properties.gutterHorizontal}px;
                    }
                    `  : ''
                }
                
             }
             
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

export const Title = styled(Text)``;

export const Front = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    image: props.image,

}))`

     ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            ${props.basis ? generateBackground(props.basis, size): ''}            
         }`)
    }; 
    

  backface-visibility: hidden;
  background-image: url('${ props => props.image ? props.image : '' }'); 
  background-position-x : 50%;
  background-position-y : 50%;
  background-size : cover;
  position : absolute;
  top : 0px;
  left : 0px;
  transform-style: preserve-3d;
  transform: rotateY(0);
  transition: transform .5s ease-in-out;
  z-index : 1;
  
  width: 100%;
  height: 100%;
  
  &>div{
    width : 100%;
    height : 100%;
    ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            background:${ `rgba(${props.basis[size].color.rgb},0.75)` };
            padding-top : ${ props.basis[size].padding.top }px;
            padding-bottom : ${ props.basis[size].padding.bottom }px;
            padding-left : ${ props.basis[size].padding.left }px;
            padding-right : ${ props.basis[size].padding.right }px;
         }`)
    };
  }
  
  
`;
export const Back = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
}))`

    ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            ${props.basis ? generateBackground(props.basis, size): ''}
            padding-top : ${ props.basis[size].padding.top }px;
            padding-bottom : ${ props.basis[size].padding.bottom }px;
            padding-left : ${ props.basis[size].padding.left }px;
            padding-right : ${ props.basis[size].padding.right }px;
         }`)
    }; 
  transition: transform .5s ease-in-out;
  backface-visibility: hidden;
  background-position-x : 50%;
  background-position-y : 50%;
  background-size : cover;
  position : absolute;
  top : 0px;
  left : 0px;
  transform-style: preserve-3d;
  z-index : 1;
  
  width: 100%;
  height: 100%;
  
  transform: rotateY(180deg);
  
  &>div{
    width : 100%;
    height : 100%;
  }
`;

export const Inner = styled.div.attrs(props => ({
}))`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d; 
`;


export const Card = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
    
   ${ props => props.responsive.map((size, i) => `
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
            min-width: ${ isNumber(props.basis[size].size.minWidth)
    ? `${ props.basis[size].size.minWidth }px`
    : props.basis[size].size.minWidth || '' };
            min-height:${ isNumber(props.basis[size].size.minHeight)
    ? `${ props.basis[size].size.minHeight }px`
    : props.basis[size].size.minHeight || '' };
             
            
            
            margin-top : ${ props.basis[size].margin.top }px;
           // margin-bottom : ${ props.basis[size].margin.bottom }px;
            margin-left : ${ props.basis[size].margin.left }px;
            margin-right : ${ props.basis[size].margin.right }px;
            
         }`)
    }; 
      background-color: transparent;

   perspective: 2000px;
   overflow-y : hidden;
    
    &:hover ${Inner}{
      transform: rotateY(180deg);
    }
    
  
`;

export const BlockCenter = styled.div.attrs(props => ({}))`

 display : flex;
 justify-content : center;  
  
`;
export const BlockCenterColumn = styled(BlockCenter)`
    flex-direction : column;
`;


export const BlockText = styled(BlockCenter).attrs(props => ({}))`

 margin-top : 10px;
  
`;


export const TextWithView = styled.p.attrs(props => ({
    responsive: props.responsive,
    typography: props.typography,
    view : props.view
}))`
position : relative;
    z-index: 2;

   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            color:${ `rgba(${props.typography[size].color[props.view].rgb},${props.typography[size].opacity[props.view].value})` };
            font-size:${ props.typography[size].font[props.view].size }px;
            font-family : '${ props.typography[size].font[props.view].family }', ${props.typography[size].font[props.view].typeface };
            font-style: ${ props.typography[size].font[props.view].style || '' };
            font-weight: ${ props.typography[size].font[props.view].weight[1] } ;
            letter-spacing: ${ props.typography[size].font[props.view].letterSpacing }px;
            line-height: ${ props.typography[size].font[props.view].lineHeight }px;
            text-align: ${ props.typography[size].text[props.view].align };
            text-decoration: ${ props.typography[size].text[props.view].decoration || '' };
            text-transform: ${props.typography[size].text[props.view].transform || '' };
         }`)
    };
`;


export const Icon = styled.p.attrs(props => ({
    responsive: props.responsive,
    typography: props.typography,
    view : props.view
}))`
position : relative;
    z-index: 2;
    margin-top : 10px;

   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            color:${ `rgba(${props.typography[size].color[props.view].rgb},${props.typography[size].opacity[props.view].value})` };
            font-size:${ props.typography[size].font[props.view].size }px;
            font-family : '${ props.typography[size].font[props.view].family }', ${props.typography[size].font[props.view].typeface };
            font-style: ${ props.typography[size].font[props.view].style || '' };
            font-weight: ${ props.typography[size].font[props.view].weight[1] } ;
            letter-spacing: ${ props.typography[size].font[props.view].letterSpacing }px;
            line-height: ${ props.typography[size].font[props.view].lineHeight }px;
         }`)
    };
`;


export const ImageContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    view : props.view
}))`

    overflow : hidden;
    border-style : solid;
    
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
             
             width:${ isNumber(props.basis[size].size[props.view].width)
    ? `${ props.basis[size].size[props.view].width }px`
    : props.basis[size].size[props.view].width };
    
            height:${ isNumber(props.basis[size].size[props.view].height)
    ? `${ props.basis[size].size[props.view].height }px`
    : props.basis[size].size[props.view].height };
            max-width: ${ isNumber(props.basis[size].size[props.view].maxWidth)
    ? `${ props.basis[size].size[props.view].maxWidth }px`
    : props.basis[size].size[props.view].maxWidth || '' };
            max-height:${ isNumber(props.basis[size].size[props.view].maxHeight)
    ? `${ props.basis[size].size[props.view].maxHeight }px`
    :props.basis[size].size[props.view].maxHeight || '' };
                                
            padding-top : ${ props.basis[size].padding[props.view].top }px;
            padding-bottom : ${ props.basis[size].padding[props.view].bottom }px;
            padding-left : ${ props.basis[size].padding[props.view].left }px;
            padding-right : ${ props.basis[size].padding[props.view].right }px;
             
            align-self:${ props.basis[size].alignment[props.view].horizontal || '' };
                   
        &>img{
            ${  isEmpty(props.basis[size].size[props.view].width) ? `
                width : auto;
                height : 100%;    
            
            
            ` : ( !isEmpty(props.basis[size].size[props.view].width) && !isEmpty(props.basis[size].size[props.view].height) ? `
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

