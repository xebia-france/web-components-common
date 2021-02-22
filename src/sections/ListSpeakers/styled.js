import styled from 'styled-components';
import {device, size} from "../../styles/constants";
import {
    generatePadding,
    generateBorder, generateBorderColor,generateBackground,
    generateBackgroundImage
} from "../../utils/StyleGenerator";
import {Above, Below, Card, Contain, Miniature, Portrait, TextContent} from "./CardSpeaker/styled";

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
            ${ props.border ?  generateBorderColor(props.border, size) : '' }        
             
            &:before{
               z-index : 0;
               position : absolute;
               width : 100%;
               height : 100%;
               content : ''; 
               ${ props.basis[size].background &&  props.basis[size].background.top ? `
                  top:${ props.basis[size].background.top  }px;
                ` : 'top : 0;'}
               left : 0;
               ${props.basis ? generateBackground(props.basis, size): ''}
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
                  
                & ${Card}{
                    & ${ Contain}{
                        & ${Below}{
                            width: calc(((100vw - ( 1 * ${props.flex[size].properties.gutterHorizontal}px / 2)) / ${props.flex[size].properties.columns } - ${   ((props.flex[size].properties.columns - 1) * props.flex[size].properties.gutterHorizontal) / props.flex[size].properties.columns }px ) * 2);
                        }
                    }
                }
                
                & ${Card}.selected{
                    & ${ Contain}{
                         width: calc(((100vw - ( 1 * ${props.flex[size].properties.gutterHorizontal}px / 2)) / ${props.flex[size].properties.columns } - ${   ((props.flex[size].properties.columns - 1) * props.flex[size].properties.gutterHorizontal) / props.flex[size].properties.columns }px ) * 2);
                    }
                }
            ` : '' }
             
             & ${ Card } ${ Contain } ${ Above } ${ TextContent}{
                position: relative;
                z-index : 5;
                transition : all 0.5s 0.2s ease, background-color 0.0s 0.7s;
                height : 160px;
                display : flex;
                flex-direction : column;
                justify-content : center;
                margin-top : 0px;
                overflow : hidden;
                padding-top : 0;
                padding-bottom : 0;
                
                &>p{
                    transition-delay : 0.5s;
                    text-align : center;
                }  
             }
             & ${Card}.selected{
                & ${ Contain }{
                    & ${ Above }{
                        & ${ Portrait}{}
                        
                        & ${ TextContent}{
                           padding : 0px 20px;
                           height : 200px;
                           margin-top : -200px;
                           padding-bottom : 50px;
                           transition : all 0.5s 0.0s ease, background-color 0.0s 0.0s;

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
         }`)
    }; 
    
    @media (max-width: 768px){
        & ${Card}{
            & ${ Contain}{
                & ${Below}{
                    width: 100%;
                }
            }
        }
        
        & ${Card}.selected{
            & ${ Contain}{
              width : 100%;
            }
        }
    }
    
   /* @media (min-width: 768px) and (max-width : 1023px) {
        ${ props => `
             flex-direction : ${ props.flex['T'].properties.direction };
             flex-wrap: ${ props.flex['T'].properties.wrap };
             justify-content: ${ props.flex['T'].properties.justify };
             align-items: ${ props.flex['T'].properties.alignItems };
             align-content: ${ props.flex['T'].properties.alignContent };
             margin-bottom : -${ props.flex['T'].properties.gutterVertical }px;
             
             &>*{
                width: calc(100% / ${ (props.flex['T'].properties.columns - 1 ) } - ${   (((props.flex['T'].properties.columns - 1 ) - 1) * props.flex['T'].properties.gutterHorizontal) / (props.flex['T'].properties.columns - 1 ) }px );
                margin-bottom : ${ props.flex['T'].properties.gutterVertical }px;
                
                ${props.flex['T'].properties.justify === 'flex-start' ? `
                    &:not(:nth-child(${ props.flex['T'].properties.columns }n) ){
                        margin-right : 0;
                    }
                    
                    `  : ''
    }
                ${props.flex['T'].properties.justify === 'flex-end' ? `
                    &:not(:nth-child(${ props.flex['T'].properties.columns }n + 1)){
                      margin-left :0;
                    }
                    `  : ''
    }
                
                ${props.flex['T'].properties.justify === 'center' ? `
                    &:not(:nth-child(${ props.flex['T'].properties.columns }n + 1)){
                      margin-left : 0;
                    }
                    `  : ''
    }
                
                ${props.flex['T'].properties.justify === 'flex-start' ? `
                    &:not(:nth-child(${ (props.flex['T'].properties.columns - 1 ) }n) ){
                        margin-right : ${props.flex['T'].properties.gutterHorizontal}px;
                    }
                    
                    `  : ''
    }
                ${props.flex['T'].properties.justify === 'flex-end' ? `
                    &:not(:nth-child(${ (props.flex['T'].properties.columns - 1 ) }n + 1)){
                      margin-left : ${props.flex['T'].properties.gutterHorizontal}px;
                    }
                    `  : ''
    }
                
                ${props.flex['T'].properties.justify === 'center' ? `
                    &:not(:nth-child(${ (props.flex['T'].properties.columns - 1 ) }n + 1)){
                      margin-left : ${props.flex['T'].properties.gutterHorizontal}px;
                    }
                    `  : ''
    }
             }
        `}    
        
        ${ props => props.flex['T'].properties.columns ? `
                & ${Card}{
                     &:not(:nth-child(${( props.flex['T'].properties.columns - 1)  }n)){
                        & ${Contain}{
                            left : 0;
                            right : auto;
                        }    
                     }
                     &:nth-child(${( props.flex['T'].properties.columns - 1)  }n){
                        & ${Contain}{
                            right : 0;
                            left : auto;
                        }    
                     }
                  }
                  
                & ${Card}{
                    & ${ Contain}{
                        & ${Below}{
                            width: calc(((100vw - ( 1 * ${props.flex['T'].properties.gutterHorizontal}px)) / ${( props.flex['T'].properties.columns - 1)  } - ${   ((( props.flex['T'].properties.columns - 1)  - 1) * props.flex['T'].properties.gutterHorizontal) / ( props.flex['T'].properties.columns - 1)  }px ) * 2);
                        }
                    }
                }
                
                & ${Card}.selected{
                    & ${ Contain}{
                         width: calc(((100vw - ( 1 * ${props.flex['T'].properties.gutterHorizontal}px)) / ${( props.flex['T'].properties.columns - 1)  } - ${   ((( props.flex['T'].properties.columns - 1)  - 1) * props.flex['T'].properties.gutterHorizontal) / ( props.flex['T'].properties.columns - 1)  }px ) * 2);
                    }
                }
            ` : '' }
    }*/
   
    @media ${ device.D } {
        ${ props => `
            & ${Card}{
                    & ${ Contain}{
                        & ${Below}{
                            width: calc(((${ size.D } + ( 2 * ${props.flex['D'].properties.gutterHorizontal}px)) / ${props.flex['D'].properties.columns } - ${   ((props.flex['D'].properties.columns - 1) * props.flex['D'].properties.gutterHorizontal) / props.flex['D'].properties.columns }px ) * 2);
                        }
                    }
                }
                
                & ${Card}.selected{
                    & ${ Contain}{
                         width: calc(((${ size.D } + (2 * ${props.flex['D'].properties.gutterHorizontal}px)) / ${props.flex['D'].properties.columns } - ${   ((props.flex['D'].properties.columns - 1) * props.flex['D'].properties.gutterHorizontal) / props.flex['D'].properties.columns }px ) * 2);
                    }
                }
        `}
    }
    
    @media (min-width: 768px){
        & ${Card}{
            &:not(.selected){
                z-index : 1;
                transition : z-index 0.5s step-end, transform 0.5s ease, opacity 0.5s ease, height 0.5s ease, max-height 0.5s ease;
            }
            
            & ${ Contain }{
                & ${ Above }{
                    & ${ TextContent}{
                        height : 160px;
        
                     }           
                }
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
                            height : 160px;
                            margin-top : -160px;
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