import styled from 'styled-components';
import {device} from "../../styles/constants";
import {
    generatePadding,
    generateBorder,
    generateBackgroundImage
} from "../../utils/StyleGenerator";
import {LanguageSelector, Links, Locale} from "../../components/NavigationBasic/styled";
import {isNumber} from "../../utils/functions";
import {TextCommon} from "../../styles/common.styled";
import { IconCommon } from "../../styles/common.styled";

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




export const Information = styled.div.attrs(props => ({

}))`
  z-index : 1;
   position : relative; 
   width : 100%;
`;

export const BluredBackground = styled.div.attrs(props => ({

}))`
  padding : 20px 5px;
  
  
`;


export const Portrait = styled.div.attrs(props => ({
    asset: props.asset,
    assetsDirectory : props.assetsDirectory
}))`
  width : 100%;
  height : 400px;
  position : relative;
  transition : height 0.5s ease;
  overflow : hidden;
  background-color : white;
  

  ${ props => ['D', 'T','M'].map((size, i) => `
    @media ${ device[size] } {
        &:after{
             transition : all 0.5s ease;
             background-image : url('${  `${props.assetsDirectory  || ''}${  props.asset }`}');
             background-size : cover;
             background-position : center;
             z-index : 1;
             position : absolute;
             width : 100%;
             height : 100%;
             content : ''; 
             top : 0;
             left : 0;
            /* -webkit-filter: grayscale(0%) brightness(100%) blur(0px);
            filter: grayscale(0%) brightness(100%) blur(0px);
            backface-visibility: hidden;*/

         }
         
         &:before{
             transition : all 0.5s ease;
             background-color : rgba(0,0,0,0.0);
             z-index : 3;
             position : absolute;
             width : 100%;
             height : 100%;
             content : ''; 
             top : 0;
             left : 0;
            

         }
    }
 `)}
  
`;

export const Image = styled.div.attrs(props => ({
    asset: props.asset,
    assetsDirectory : props.assetsDirectory
}))`
  width : 150px;
  height :150px;
  border-radius : 100%;
  overflow : hidden;
  z-index : 10;
  transition : all 0.5s ease;
  position  : relative;
  display: none; 
  

  ${ props => ['D', 'T'].map((size, i) => `
    @media ${ device[size] } {
        &:after{
             transition : all 0.5s ease;
             background-image : url('${  `${props.assetsDirectory  || ''}${  props.asset }`}');
             background-size : cover;
             background-position : center;
             z-index : 1;
             position : absolute;
             width : 100%;
             height : 100%;
             content : ''; 
             top : 0%;
             left : 0%;
             -webkit-filter: grayscale(0%)/* brightness(100%)*/ blur(0px);
            filter: grayscale(0%)/* brightness(100%)*/ blur(0px);
            backface-visibility: hidden;

         }
    }
 `)}
  
`;

export const Text = styled(TextCommon)`
-`;


export const Miniature = styled.div.attrs(props => ({
    asset: props.asset,
    assetsDirectory : props.assetsDirectory
}))`
  width : 100px;
  height : 150px;
  position : absolute;
  bottom:0;
  right :0;
  z-index: 10;
  opacity : 0;
  transition : all 0.5s ease;

  ${ props => ['D', 'T'].map((size, i) => `
    @media ${ device[size] } {
        &:after{
             transition : all 0.5s ease;
             background-image : url('${  `${props.assetsDirectory  || ''}${  props.asset }`}');
             background-size : cover;
             background-position : center;
             z-index : 1;
             position : absolute;
             width : 100%;
             height : 100%;
             content : ''; 
             top : 0;
             left : 0;
             //border : 2px solid white;
             overflow : hidden;
             //border-radius : 100%;
             transform : translateY(150px);
             transition : transform 0.5s ease;

         }
    }
 `)}
  
`;

export const BasicInfo = styled.div.attrs(props => ({

}))`
    transition : all 0.5s ease;
    height : 150px;
    width : 100%;
    padding : 20px;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    margin-top : 0;
    align-self : flex-end;
    
    &>p{
        transition : all 0.5s ease;
    }
    
`;

export const Second = styled.div.attrs(props => ({

}))`
    position : relative;
  
    
`;


export const SecondaryInfo = styled.div.attrs(props => ({

}))`
    transition : all 0.5s ease;
   
    padding : 20px;
    position : absolute;
    opacity : 0;
`;


export const Main = styled.div.attrs(props => ({

}))`
    transition : all 0.5s ease;
    z-index : 6;
    display : flex;
    background: white;
    position : relative;
   // overflow : hidden;
    flex-direction : column;
    transform : translateY(calc(100% - 150px));
 
`;


export const Banner = styled.div.attrs(props => ({

}))`
  width : 100%;
  height : 150px;
  background-color : rgba(0,0,0,0.8);
  transition : all 0.5s ease;
  box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.07);
  transform : translateY(100%);
  display : flex;
  position : absolute;
  display : none;
  bottom : 0;
  left: 0;
  align-items : center;
  z-index: 3;
  //opacity : 0;
  
  &>div:nth-child(2){
    width : 100%;
    padding-left : 20px;

    
     &>p{
        color : white;
        text-align : left;
    }
  }

`;

export const Content = styled.div.attrs(props => ({

}))`
  position : relative;
  width : 100%;
  height : 100%;
  background : white;
  transition : all 0.5s ease;
  display : flex;
  flex-direction : column;
  align-items : flex-end;
  overflow : hidden;


`;

export const Contain = styled.div.attrs(props => ({

}))`
   z-index : 3;
    position:absolute;
    width : 100%;
    transition : width 0.5s ease, height 0.5s ease;
    overflow : hidden;
    height : 530px;
    box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.0);




`;

export const IconContent = styled.div.attrs(props => ({

}))`
  width : 100%;
  padding : 20px;
  display : flex;


`;

export const TextContent = styled.div.attrs(props => ({

}))`
  width : 100%;
  padding : 20px;
  
  &>p{
    transition : color 0.5s ease;
  }


`;

export const Icon = styled(IconCommon).attrs(props => ({

}))`
 
`;

export const Below = styled.div.attrs(props => ({
    elementWidth : props.elementWidth
}))`
  background: white;
  position : absolute;
  top : 150px;
  left : 0;
  ${props => props.elementWidth ? `width : calc(${props.elementWidth}px * 2);` : `width : 200%;`}
  
  height : calc(100% - 150px);
  z-index : 1;
  transition : width 0.5s ease, height 0.5s ease;
  
  &>*{
    opacity : 0;
    transition : opacity 0.5s ease;
  }
`;


export const Above = styled.div.attrs(props => ({

}))`
    z-index : 3;
    position:relative;
    width : 100%;
    transition : width 0.4s ease;

`;



export const Card = styled.div.attrs(props => ({
    responsive: props.responsive,
    flex : props.flex
}))`
  cursor : pointer;
  transition : transform 0.5s ease, opacity 0.5s ease, height 0.5s ease;
  transform : scale(1);
  opacity : 1;
  position : relative;
  height : 530px;
  
  
  
  
  &.selected{
    z-index : 2;
    & ${Content}{
        position : absolute;
        width : 200%;
    }
  }
  
  ${ props => ['M'].map((size, i) => `
    @media ${ device[size] } {
        max-width : 400px;
        margin : auto:
    }
 `)}
    

  
  
    
  
`;

export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    flex: props.flex,
    nbrSlides : props.nbrSlides

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
             
             & ${ Card } ${ Contain } ${ Above } ${ TextContent}{
                position: relative;
                z-index : 5;
                transition : transform 0.5s ease;
                height : 130px;
                display : flex;
                flex-direction : column;
                justify-content : center;
                
             }
             
             & ${Card}{
                &:not(.selected){
                    z-index : 1;
                    transition : z-index 0.5s step-end, transform 0.5s ease, opacity 0.5s ease, height 0.5s ease;
                }
                & ${Content}{
                     width : 100%;
                   
                }
                
             }
             
             & ${Card}.selected{
             
              
                z-index : 2;
                 & ${ Contain }{
                    width : 200%;
                    -webkit-box-shadow: 0px 20px 40px 0px rgba(45,69,112,0.4);
                    -moz-box-shadow: 0px 20px 40px 0px rgba(45,69,112,0.4);
                    box-shadow: 0px 20px 40px 0px rgba(45,69,112,0.4);
                    
                    & ${ Above }{
                        ${ Portrait}{
                            height : 150px;
                            
                            
                            &:after{
                                filter : blur(10px);
                            }
                            
                            
                            
                            &:before{
                               background-color : rgba(0,0,0,0.5);
                            }
                        }
                        ${ TextContent}{
                            transform: translateY(calc(-100% - 10px));
                            &>p{
                                color : white;
                            }
                        }
                        ${ Miniature }{
                           opacity : 1;
                            &:after{
                                transform : translateY(0);
                            }
                        }
                    }
                    
                    & ${ Below }{
                       
                       & >*{
                            opacity : 1;
                        }
                    } 
                 }
                
              }
            ${ props.flex[size].properties.columns ? `
                & ${Card}{
               
                     &:not(:nth-child(${props.flex[size].properties.columns }n)){
                        & ${Contain}{
                            left : 0;
                        }    
                     }
                     &:nth-child(${props.flex[size].properties.columns }n){
                        & ${Contain}{
                            right : 0;
                        }    
                     }
                  }
            
            ` : '' }
         }`)
    }; 
    
    
    
    &.active{
        &>${Card}:not(.selected){
            transform : scale(0.8);
            opacity : 0.5;
        }
    }
    
    ${ props => ['M'].map((size, i) => `
    @media ${ device[size] } {
        max-width : none;
        width : calc(100% * ${props.nbrSlides});
        justify-content : flex-start;
    
    
    
        & ${Card}{
            & ${ Contain }{
                width : 100%;
                
                & ${Below}{
                    width  100%;
                }
            }
       }
       & ${Card}.selected{
            height : 700px;
            & ${ Contain }{
                width : 100%;
                height : 700px;
                
                & ${Below}{
                    width  100%;
                }
            }
       }
       
       
       
       
       
    }
 `)}
    
    
    
`;