import styled from 'styled-components';
import {device} from "../../../styles/constants";
import {TextCommon} from "../../../styles/common.styled";
import { IconCommon } from "../../../styles/common.styled";

export const Portrait = styled.div.attrs(props => ({
    asset: props.asset,
    assetsDirectory : props.assetsDirectory
}))`
  width : 100%;
  padding-top : 400px;
  position : relative;
  transition : all 0.5s ease;
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
             height : 400px;
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
             height : 400px;
             content : ''; 
             top : 0;
             left : 0;
         }
    }
 `)}
  
`;

export const Text = styled(TextCommon)`
`;


export const Miniature = styled.div.attrs(props => ({
    asset: props.asset,
    assetsDirectory : props.assetsDirectory
}))`
  width : 100px;
  height : 100px;
  position : absolute;
  top:-50px;
  left :calc(50% - 50px);
  z-index: 10;
  opacity : 0;
  transition : all 0.5s ease;
  transform : scale(0);
  transform-origin : center;
  

  ${ props => ['D', 'T', 'M'].map((size, i) => `
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
             overflow : hidden;
             border-radius : 100%;
             transition : transform 0.5s ease;
         }
    }
 `)}
  
`;

export const Contain = styled.div.attrs(props => ({

}))`
   z-index : 3;
    //position:absolute;
    width : 100%;
    transition : width 0.5s ease, height 0.5s ease;
    overflow : hidden;
   // height : 530px;
    box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.0);
`;

export const IconContent = styled.div.attrs(props => ({

}))`
  width : 100%;
  display : flex;
  
  &>*:not(:first-child),  &>*:not(:last-child){
    margin-right : 20px;
  }
`;

export const TextContent = styled.div.attrs(props => ({

}))`
  width : 100%;
  
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
  position : relative;
  width : 100%;
  z-index : 3;
  transition : width 0.5s ease, height 0.5s ease;
  overflow : visible;
  padding : 20px;
  padding-top : 50px;
  
  &>*:not(${Miniature}){
    //opacity : 0;
    transition : opacity 0.5s ease;
  }
`;


export const Above = styled.div.attrs(props => ({

}))`
    z-index : 1;
    position:relative;
    width : 100%;
    transition : width 0.4s ease;
    
    & ${ TextContent}{
        padding :40px 20px;
    }
`;

export const Card = styled.div.attrs(props => ({
    responsive: props.responsive,
    flex : props.flex,
    heightAbove : props.heightAbove,
    heightBelow : props.heightBelow

}))`
  cursor : pointer;
  transition : all 0.5s ease;
  transform : scale(1);
  opacity : 1;
  position : relative;
  max-height : 530px;
  overflow : hidden;
  background : white;
  
  ${props => props.heightAbove ? `max-height : ${props.heightAbove}px;` : ''}
  
  &.selected{
    ${props => props.heightBelow ? `max-height : ${props.heightAbove + props.heightBelow}px;` : ''}
  }
  
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
             
             & ${ Card } ${ Contain } ${ Above } ${ TextContent}{
                position: relative;
                z-index : 5;
                transition : all 0.5s ease;
                //height : 130px;
                display : flex;
                flex-direction : column;
                justify-content : center;
                margin-top : 0px;
             }
             
             & ${Card}{
                
                &:not(.selected){
                    z-index : 1;
                    transition :all 0.5s ease;
                }
                
             }
             
             & ${Card}.selected{
                z-index : 2;
                //max-height : 1200px;
                 & ${ Contain }{
                    -webkit-box-shadow: 0px 20px 40px 0px rgba(45,69,112,0.4);
                    -moz-box-shadow: 0px 20px 40px 0px rgba(45,69,112,0.4);
                    box-shadow: 0px 20px 40px 0px rgba(45,69,112,0.4);
                    
                    & ${ Above }{
                        ${ Portrait}{
                            //height : 230px;
                            padding-top : 0px;
                            padding-bottom : 30px;
                            
                            &:after{
                                filter : blur(10px);
                            }
                            
                            &:before{
                               background-color : rgba(0,0,0,0.5);
                            }
                        }
                        ${ TextContent}{
                            //margin-top: -50%;
                            //height : 230px;
                            &>p{
                                color : white;
                            }
                        }
                        
                    }
                    
                    & ${ Below }{
                        ${ Miniature }{
                         transform : scale(1);
                        }
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
            transform : scale(1);
            opacity : 0.5;
        }
    }
`;