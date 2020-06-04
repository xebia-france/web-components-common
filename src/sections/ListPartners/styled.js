import styled from 'styled-components';
import {device} from "../../styles/constants";
import {
    generatePadding,
    generateBorder,
    generateBackgroundImage, getFormatedColor, generateBackgroundImageWebp
} from "../../utils/StyleGenerator";

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
  overflow : hidden;
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             
            ${ props.basis ? generatePadding(props.basis, size) : '' }
            ${ props.border ?  generateBorder(props.border, size) : '' }        
            ${ props.border ?
    ( props.border[size].color ?
        `border-color :${ props.border[size].color.rgb ? `rgba(${props.border[size].color.rgb},${props.border[size].opacity.value});`
            : `${props.border[size].color.hex};`}` : '')
    : ''}
             
            &:after{
               z-index : 0;
               position : absolute;
               width : 100%;
               height : 100%;
               content : ''; 
               ${ props.basis[size].background &&  props.basis[size].background.top ? `
                  top:${ props.basis[size].background.top  }px;
                ` : 'top : 0;'}
               left : 0;
               background-color: ${ getFormatedColor(props.basis[size].color, props.basis[size].opacity) };
           ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background:${ props.basis[size].color.gradient  };

               ` : ''}
            }
         }`)
    }; 
    
    ${ props =>  props.responsiveContent ? props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
            
            &:before{
               z-index : 0;
               position : absolute;
               width : 100%;
               height : 100%;
               content : ''; 
               top : 0;
               left : 0;
               ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}  
            }
            .webp &:before{
               ${ props.asset ? generateBackgroundImageWebp(props.asset, size, props.assetsDirectory) : ''}  
            }
         }`) : ''
    };
`;


export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    flex: props.flex

}))`
  //max-width : 1280px;
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
