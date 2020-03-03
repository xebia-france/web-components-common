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

export const Text = styled(TextCommon)``;


export const Miniature = styled.div.attrs(props => ({
    asset: props.asset,
    assetsDirectory : props.assetsDirectory
}))`
  width : 100px;
  height : 100%;
  position : absolute;
  top:0;
  right :0;
  z-index: 10;
  opacity : 0;
  min-height : 150px;
  transition : all 0.5s ease, opacity 0.5s ease;

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
             min-width : 100px;
             height : 100%;
             content : ''; 
             top : 0;
             left : 0;
             overflow : hidden;
             transform : translateY(100%);
             transition : transform 0.5s ease;
         }
    }
 `)}
  
`;

export const Contain = styled.div.attrs(props => ({

}))`
   z-index : 3;
    position:absolute;
    width : 100%;
    transition : width 0.5s ease, height 0.5s ease;
    overflow : hidden;
    height : 550px;
    box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.0);
    background-color : white;
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
    widthCard : props.widthCard
}))`
  background: white;
  position : relative;
  z-index : 1;
  transition :all 0.5s ease;
  padding : 40px 20px;
  ${props => props.widthCard ? `width : calc(${props.widthCard}px * 2);` : `width : 200%;`}
  
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
    transition : all 0.4s ease;
`;

export const Card = styled.div.attrs(props => ({
    responsive: props.responsive,
    flex : props.flex,
    heightAbove : props.heightAbove,
    heightBelow : props.heightBelow
}))`
  cursor : pointer;
  transition : transform 0.5s ease, opacity 0.5s ease, height 0.5s ease, max-height 0.5s ease;
  transform : scale(1);
  opacity : 1;
  position : relative;
  min-height : 550px;

  ${ props => props.heightAbove ? `height : ${props.heightAbove}px;` : ''}
  
  & ${ Contain } ${Below} ${Miniature}{
    ${ props => props.heightAbove ? `height : ${props.heightAbove}px;` : ''}
  }
  
  &.selected{
    ${props => props.heightBelow ? `max-height : ${props.heightAbove + props.heightBelow}px;` : ''}
    
    & ${ Contain } ${Below} ${Miniature}{
        ${ props => props.heightAbove ? `height : ${props.heightAbove}px;` : ''}
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
           /*  flex-direction : ${ props.flex[size].properties.direction };
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
                
             }*/
             
             & ${ Card } ${ Contain } ${ Above } ${ TextContent}{
                position: relative;
                z-index : 5;
                transition : transform 0.5s ease;
                display : flex;
                flex-direction : column;
                justify-content : center;
                margin-top : 0;
                padding : 20px;
                min-height : 150px;
             }
             
             & ${Card}{
                &:not(.selected){
                    z-index : 1;
                    transition : z-index 0.5s step-end, transform 0.5s ease, opacity 0.5s ease, height 0.5s ease, max-height 0.5s ease;
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
                            padding-top : 0px;
                            
                            &:after{
                                filter : blur(10px);
                            }
                            
                            &:before{
                               background-color : rgba(0,0,0,0.5);
                            }
                        }
                        ${ TextContent}{
                            &>p{
                                color : white;
                            }
                        }
                        ${ Miniature }{
                           opacity : 1;
                           max-height : 100%;
                            &:after{
                                transform : translateY(0%);
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
        
    }
   
    
   
    
     
    
    &.active{
        &>${Card}:not(.selected){
            transform : scale(0.8);
            opacity : 0.5;
        }
    }
`;