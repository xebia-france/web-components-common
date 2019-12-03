import styled from 'styled-components';
import {device} from "../../styles/constants";

export const Wrapper = styled.section.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis

}))`
  display : flex;
  flex-direction : column;
  width: 100%;  
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            background-color:${ `rgba(${props.basis[size].color.rgb},${props.basis[size].opacity.value})` };
             
            padding-top : ${ props.basis[size].padding.top }px;
            padding-bottom : ${ props.basis[size].padding.bottom }px;
            padding-left : ${ props.basis[size].padding.left }px;
            padding-right : ${ props.basis[size].padding.right }px;
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
                width: calc(100% / ${ props.flex[size].properties.columns } - ${   (( props.flex[size].properties.columns - 1 ) * props.flex[size].properties.gutterHorizontal ) / props.flex[size].properties.columns }px );
                margin-bottom : ${ props.flex[size].properties.gutterVertical }px;
             }
             
         }`)
    }; 
`;
