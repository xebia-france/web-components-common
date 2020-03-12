import styled from 'styled-components';
import {device} from "../../styles/constants";
import {
    generatePadding,
    generateBorder,
    generateBackgroundImage
} from "../../utils/StyleGenerator";

let grey80 = '#666666';
let grey50 = '#A2A2A2';
let red = '#FE414D';

export const Wrapper = styled.section.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    basis: props.basis,
    border: props.border,
    asset : props.asset,
    assetsDirectory : props.assetsDirectory

}))`
  display : flex;
  flex-direction : column;
  width: 100%;  
  position : relative;
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             
            ${ props.basis ? generatePadding(props.basis, size) : '' }
            ${ props.border ?  generateBorder(props.border, size) : '' }        
            ${ props.border ? 
                    ( props.border[size].color ? 
                        `border-color :${ props.border[size].color.rgb ? `rgba(${props.border[size].color.rgb},${props.border[size].opacity.value});` 
                                                                        : `${props.border[size].color.hex};`}` : '')
             : ''}
             
            &:before{
               z-index : 0;
               position : absolute;
               width : 100%;
               height : 100%;
               content : ''; 
               top : 0;
               left : 0;
               background-color:${ props.basis[size].color.rgb ?  `rgba(${props.basis[size].color.rgb},${props.basis[size].opacity.value})` : props.basis[size].color.hex };
            }
         }`)
    }; 
    
    ${ props =>  props.asset ?  props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
         ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}    
         }
         }`)
    : ''  };
`;


export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    flex: props.flex

}))`
  max-width : 1280px;
  margin: auto;
  width : inherit;
  display : flex;
  z-index : 2;
  
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

export const Test = styled.div.attrs(props => ({

}))`
  width : 100%;
  height : 100%;
  background : yellow;
  position : relative;
`;



export const Dash = styled.div.attrs(props => ({

}))`
   width : 10px;
   border-bottom : 1px solid grey;
   margin-top : 50px;
`;


export const Head = styled.div.attrs(props => ({

}))`
    background-color : ${grey80};
    padding : 20px 10px;
    text-align : center;
`;

export const Column = styled.div.attrs(props => ({

}))`
    
`;


export const HoursLine = styled.div.attrs(props => ({

}))`
  width : 35px;
  min-width : 35px;
  height : auto;
  display : flex;
  flex-direction : column;
  background : white;
  border-right : 1px solid grey;
  
  &>div{
  
    height : 200px;
    position : relative;
    display : flex;
    flex-direction : column; 
    align-items : flex-end;
    
    &:first-child{
        margin-top : 10px;
    }
    
    &>p{
        position : absolute;
        top : -8px;
        right : 10px;
    }
    
  }
`;


export const HeadSchedule = styled.div.attrs(props => ({

}))`
  display : flex;
`;

export const BodySchedule = styled.div.attrs(props => ({

}))`
  display : flex;
  
  & ${Column}{

        & ${Head}{
            border-right: 1px solid rgba(255,255,255,0.5);
        }
    
  
  
  }
`;


export const Schedule = styled.div.attrs(props => ({

}))`
  display : flex;
  flex-direction : column;
  
  
`;




export const Label = styled.div.attrs(props => ({

}))`
  width : 35px;
  background : black;
  
  & p{
    color : white;
    transform : rotate(-90deg);
    margin-top : 18px;
  }
`;




export const Days = styled.div.attrs(props => ({

}))`
  width : 100%;
  background : black;
  display : flex;
`;


export const Day = styled.div.attrs(props => ({

}))`
  background-color : ${grey50};
  border-right: 1px solid rgba(255,255,255,0.5);
  padding : 20px;
  color : white;
  cursor : pointer;
  
  &.active{
    background-color : ${red};
  }
  
`;
