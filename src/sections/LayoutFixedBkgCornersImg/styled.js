import styled from 'styled-components';
import {device} from "../../styles/constants";
import {
    generatePadding,
    generateBorder,
    generateBackgroundImage, generateBackgroundImageWebp,
    generateSize, getFormatedColor,
    getFormatedSizeProperty
} from "../../utils/StyleGenerator";

export const MainWrapper = styled.div`
    position : relative;
    overflow : hidden;
`


export const ImageCorner = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    index : props.index,
    responsiveContent: props.responsiveContent,
    asset : props.asset,
    assetsDirectory : props.assetsDirectory
}))`
    position : absolute;
    z-index : 0;
    
    ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.basis[size].size &&  props.basis[size].size[props.index] ?
                `
                ${getFormatedSizeProperty('width', props.basis[size].size[props.index])}
                ${getFormatedSizeProperty('height', props.basis[size].size[props.index])}
                ${getFormatedSizeProperty('max-width', props.basis[size].size[props.index])}
                ${getFormatedSizeProperty('max-height', props.basis[size].size[props.index])}
                ${getFormatedSizeProperty('min-width', props.basis[size].size[props.index])}
                ${getFormatedSizeProperty('min-height', props.basis[size].size[props.index])}
                `
                : ''
            }
         }`)
    }; 
    
    ${ props =>  props.asset ?  props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
            ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}  
            background-size :cover; 
            background-repeat : no-repeat;
         }
         }`)
    : ''  };
         
   &>img{
        width : 100%; 
   }     
`;

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
                
  & ${ ImageCorner }{
       
       &:nth-child(1){
           top : 0;
           left: 0;
           background-position : top;
       }
       &:nth-child(2){
           top : 0;
           right: 0;
           background-position : top;
       }
       &:nth-child(3){
           bottom : 0;
           left: 0;
           background-position : top;
       }
       &:nth-child(4){
           bottom : 0;
           right: 0;
           background-position : top;
       }
   }
  
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            ${ props.basis ? generateSize(props.basis, size) : '' }       
            ${ props.basis ? generatePadding(props.basis, size) : '' }
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
               width : 100%;
               height : 100%;
               position : absolute;
               content : ''; 
               
            }
            .no-webp &:before{
               ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}  
                   background-size :cover;
                   background-position : top;
                   background-repeat : no-repeat;
               
            }
            .webp &:before{
               ${ props.asset ? generateBackgroundImageWebp(props.asset, size, props.assetsDirectory) : ''} 
               background-size :cover ;
               background-position : top;
               background-repeat : no-repeat;
            }
         
         }`) : ''
    };
`;

export const WrapperTwin = styled(Wrapper)`
    height : auto !important;
    
    @media ${ device.T }{
            position : absolute;
            top : 0;
    }
    @media ${ device.D }{
            position : absolute;
            top : 0;
    }
`




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
             
             
             
             &>*:not(${ImageCorner}){
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
