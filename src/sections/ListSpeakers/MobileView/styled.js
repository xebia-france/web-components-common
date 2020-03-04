import styled from 'styled-components';
import {device} from "../../../styles/constants";
import {TextCommon} from "../../../styles/common.styled";
import { IconCommon } from "../../../styles/common.styled";

export const Portrait = styled.div.attrs(props => ({
    asset: props.asset,
    assetsDirectory : props.assetsDirectory
}))`
  width : 100%;
  min-height : 400px;
  position : relative;
  transition : all 0.5s ease;
  overflow : hidden;
  background-color : white;
  transition-delay : 0.2s;
  

  ${ props => ['D', 'T','M'].map((size, i) => `
    @media ${ device[size] } {
        &:after{
             background-image : url('${  `${props.assetsDirectory  || ''}${  props.asset }`}');
             background-size : cover;
             background-position : center top;
             z-index : 1;
             position : absolute;
             width : 100%;
             height : 100%;
             content : ''; 
             top : 0;
             left : 0;
             filter : blur(0px);
             -webkit-filter: blur(0px);
             transition: 0.5s filter linear;
            -webkit-transition: 0.5s -webkit-filter ease;
            -moz-transition: 0.5s -moz-filter ease;
            -ms-transition: 0.5s -ms-filter ease;
            -o-transition: 0.5s -o-filter ease;
         }
         
         &:before{
             transition : all 0.5s 0.2s ease;
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
 
 @media (min-width: 768px){
    &:after{
     background-position : center;
    }
 }
  
`;

export const Text = styled(TextCommon)``;

export const Miniature = styled.div.attrs(props => ({
    asset: props.asset,
    assetsDirectory : props.assetsDirectory
}))`
  width : 100px;
  height : 100px;
  position : absolute;
  bottom:-50px;
  left :calc(50% - 50px);
  z-index: 10;
  opacity : 1;
  transition : all 0.3s ease;
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
         }
    }
 `)}
 
 @media (min-width: 768px){
    overflow : hidden;
    width : 100px;
    height : 160px;
    left : auto;
    bottom : 0px;
    right : 0px;
    transform : scale(1);
    transition-delay : 0.0s;
    
    &:after{
        border-radius : 0%;
        top : 100%;
        transition : all 0.3s ease;

    }
 }
  
`;

export const Contain = styled.div.attrs(props => ({}))`
    z-index : 3;
    width : 100%;
    transition : all 0.5s ease;
    overflow : hidden;
    min-height : 560px;
    height : 560px;
    box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.0);
    
   
`;

export const IconContent = styled.div.attrs(props => ({}))`
  width : 100%;
  display : flex;
  
  &>*:not(:first-child),  &>*:not(:last-child){
    margin-right : 20px;
  }
`;

export const TextContent = styled.div.attrs(props => ({}))`
  width : 100%;
  
  &>p{
    transition : color 0.5s ease;
  }
  
  @media (min-width: 768px){
    &>p{
        text-align : left !important;
    }
  }
`;

export const Icon = styled(IconCommon).attrs(props => ({}))``;

export const Below = styled.div.attrs(props => ({
}))`
  background: white;
  position : relative;
  width : 100%;
  z-index : 3;
  transition : all 0.5s 0.0s ease;
  overflow : hidden;
  padding : 0px 20px;
  transition-delay : 0s;
  
  &>*:not(${Miniature}){
    opacity : 0;
    transition : opacity 0.5s ease;
    transition-delay : 0.0s;
    
    &:first-child{
        margin-top : 50px;
    }
    &:last-child{
        margin-bottom : 30px;
    }
  }
  
  @media (min-width: 768px){
    height : calc(100% - 160px);
    max-width : 630px;
  }
`;


export const Above = styled.div.attrs(props => ({}))`
    z-index : 5;
    position:relative;
    width : 100%;
    transition : all 0.5s ease;
    background : white;
    
    & ${ TextContent}{
        padding :40px 20px;
    }
    
   @media (min-width: 768px){
    overflow : hidden;
   
    & ${ TextContent}>p{
       text-align : left;
    }
  }
`;

export const Card = styled.div.attrs(props => ({
    responsive: props.responsive,
    flex : props.flex,
    heightBelow : props.heightBelow

}))`
  cursor : pointer;
  transition : all 0.5s ease;
  transform : scale(1);
  opacity : 1;
  position : relative;
  overflow : hidden;
  background : white;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
 -webkit-tap-highlight-color: transparent;
 -webkit-user-select: none;
 -khtml-user-select: none;
 -moz-user-select: none;
 -ms-user-select: none;
  user-select: none;
  
  &.selected{
    ${ Contain }{
        ${props => props.heightBelow ? `height :  calc(200px + ${ props.heightBelow}px);` : ''}
    }
 }
  
 @media (min-width: 768px){
    min-height : 560px;
    overflow : visible;
    ${ Contain }{
        position : absolute;
        background : white;
        transition-delay : 0.2s;
    }
    &.selected{
        ${ Contain }{
            height : 100%;
            transition-delay : 0.0s;
        }
     }
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
                height : 160px;
                display : flex;
                flex-direction : column;
                justify-content : center;
                margin-top : 0px;
                overflow : hidden;
                transition-delay : 0.2s;
                
                &>p{
                    transition-delay : 0.5s;
                    text-align : center;
                }  
             }
             
             & ${Card}{
                
                &:not(.selected){
                    z-index : 1;
                    transition :all 0.5s ease;
                }
             }
             
             & ${Card}.selected{
                z-index : 2;

                & ${ Contain }{
                    -webkit-box-shadow: 0px 20px 40px 0px rgba(45,69,112,0.4);
                    -moz-box-shadow: 0px 20px 40px 0px rgba(45,69,112,0.4);
                    box-shadow: 0px 20px 40px 0px rgba(45,69,112,0.4);
                    
                    & ${ Above }{
                        
                        & ${ Portrait}{
                            min-height : 200px;
                            transition-delay : 0.0s;
                            
                            &:after{
                                filter : blur(10px);
                                -webkit-filter: blur(10px);

                            }
                            
                            &:before{
                               background-color : rgba(0,0,0,0.5);
                               transition : all 0.5s 0.0s ease;
                            }
                        }
                        
                        & ${ TextContent}{
                           padding : 0px 20px;
                           margin-top : -160px;
                           padding-bottom : 50px;
                            transition-delay : 0.0s;
                            
                            &>p{
                                color : white;
                                transition-delay : 0.0s;
                            }
                        }
                        
                    }
                    
                    & ${ Below }{
                        padding : 0px 20px;
                        transition-delay : 0.2s;
                      
                       &>*{
                            opacity : 1;
                            transition-delay : 0.2s;
                       }
                    }
                    
                    ${ Miniature }{
                         transform : scale(1);
                         opacity : 1;
                         transition-delay : 0.2s;
                    } 
                 }
                
              }
            /*${ props.flex[size].properties.columns ? `
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
            ` : '' }*/
         }`)
    }; 
    
    
    
    @media (min-width: 768px) and (max-width : 1023px) {
        flex-direction : row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items:flex-start;
        align-content: flex-start;
        margin-bottom : -20px;
        
        &>*{
            width: calc(100% / 2 - ${   ((2 - 1) * 20) / 2 }px );
            margin-bottom :20px;
                &:not(:nth-child(2n + 1)){
                      margin-left : 20px;
                     
                          & ${Contain}{
                                right : 0;
                          }
                }
        }
        
        & ${Card}{
            & ${ Contain}{
                & ${Below}{
                    width: calc(((100vw - (2 * 20px)) / 2 - ${   ((2 - 1) * 20) / 2 }px ) * 2);
                }
            }
        }
        
        & ${Card}.selected{
            & ${ Contain}{
                    width: calc(((100vw - (2 * 20px)) / 2 - ${   ((2 - 1) * 20) / 2 }px ) * 2);                
            }
        }  
        
        
    }
   
    @media (min-width : 1024px) and (max-width : 1279px) {
        flex-direction : row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items:flex-start;
        align-content: flex-start;
        margin-bottom : -20px;
        
        &>*{
            width: calc(100% / 3 - ${   ((3 - 1) * 20) / 3 }px );
            margin-bottom :20px;
            
            &:not(:nth-child(3n + 1)){
                  margin-left : 20px;
            }
        }
        
        & ${Card}{
             &:not(:nth-child(3n)){
                & ${Contain}{
                    left : 0;
                }    
             }
             &:nth-child(3n){
                & ${Contain}{
                    right : 0;
                }    
             }
        }
        & ${Card}{
            & ${ Contain}{
                & ${Below}{
                    width: calc(((100vw - (2 * 20px)) / 3 - ${   ((3 - 1) * 20) / 3 }px ) * 2);
                }
            }
        }
        
        & ${Card}.selected{
            & ${ Contain}{
               width: calc(((100vw - (2 * 20px)) / 3 - ${   ((3 - 1) * 20) / 3 }px ) * 2);             
            }
        } 
        
    }
   
    
    @media (min-width : 1278px) {
        flex-direction : row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items:flex-start;
        align-content: flex-start;
        margin-bottom : -20px;
        
        &>*{
            width: calc(100% / 4 - ${   ((4 - 1) * 20) / 4 }px );
            margin-bottom :20px;
            &:not(:nth-child(4n + 1)){
                  margin-left : 20px;
            }
        }
        
        & ${Card}{
            &:not(:nth-child(4n)){
                & ${Contain}{
                    left : 0;
                }    
             }
             &:nth-child(4n){
                & ${Contain}{
                    right : 0;
                }    
            }
        }
        & ${Card}{
            & ${ Contain}{
                & ${Below}{
                    width: calc(((1278px - (2 * 20px)) / 4 - ${   ((4 - 1) * 20) / 4 }px ) * 2);
                }
            }
        }
        
        & ${Card}.selected{
            & ${ Contain}{
               width: calc(((1278px - (2 * 20px)) / 4 - ${   ((4 - 1) * 20) / 4 }px ) * 2);             
            }
        } 
        
    }
    
    @media (min-width: 768px){
        & ${Card}{
            &:not(.selected){
                z-index : 1;
                transition : z-index 0.5s step-end, transform 0.5s ease, opacity 0.5s ease, height 0.5s ease, max-height 0.5s ease;
            }
            
            
            
        }
        
        & ${Card}.selected{
            z-index : 2;
            transition : z-index 0.0s step-end, transform 0.5s ease, opacity 0.5s ease, height 0.5s ease, max-height 0.5s ease;
            
            & ${ Contain }{
                    & ${ Above }{
                        & ${ Portrait}{
                            min-height : 160px;
                        }
                        & ${ TextContent}{
                            padding-bottom : 0px;
                        }
                    } 
                    
                    & ${ Below}{
                        transition-delay : 0.0s;
                    }
                    
                    ${ Miniature}{
                        transition-delay : 0.3s;
                        &:after{
                            top : 0px;
                            transition-delay : 0.3s;
                        }
                    }
            }   
        } 
        
        &.active{
            &>${Card}:not(.selected){
                transform : scale(0.8);
                opacity : 0.5;
            }
        }
     }
`;