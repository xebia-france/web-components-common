import styled from 'styled-components';
import {device, gutter} from "../../styles/constants";

export const Wrapper = styled.section.attrs(props => ({
    responsive: props.responsive,
    colorElement: props.colorElement,
    paddingElement : props.paddingElement,
    opacityElement : props.opacityElement

}))`
  display : flex;
  flex-direction : column;
  width: 100%;  
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             padding-top: ${ props.paddingElement[size].top }px;
             padding-right: ${ props.paddingElement[size].right }px;
             padding-bottom: ${ props.paddingElement[size].bottom }px;
             padding-left: ${ props.paddingElement[size].left }px;
             
             background-color:${ props.colorElement[size] && props.opacityElement[size]  ? `rgba(${props.colorElement[size].rgb} , ${ props.opacityElement[size].value})` : '' };
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
             flex-direction : ${ props.flex[size].direction };
             flex-wrap: ${ props.flex[size].wrap };
             justify-content: ${ props.flex[size].justify };
             align-items: ${ props.flex[size].alignItems };
             align-content: ${ props.flex[size].alignContent };
             margin-bottom : -${ props.flex[size].gutterVertical }px;
             
             &>*{
                width: calc(100% / ${ props.flex[size].columns } - ${   (( props.flex[size].columns - 1 ) * props.flex[size].gutterHorizontal ) / props.flex[size].columns }px );
                margin-bottom : ${ props.flex[size].gutterVertical }px;
             }
             
         }`)
    }; 
`;
