import styled from 'styled-components';
import {device, size} from "../../../styles/constants";
import {TextCommon} from "../../../styles/common.styled";
import { IconCommon } from "../../../styles/common.styled";
import { getFormatedColor, generateBorder} from "../../../utils/StyleGenerator";
import { isNumber } from "../../../utils/functions";

export const Portrait = styled.div.attrs(props => ({
    asset: props.asset,
    assetsDirectory : props.assetsDirectory
}))`
  width : 100%;
  min-height : 400px;
  position : relative;
  transition : all 0.5s ease;
  overflow : hidden;
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
`;

export const IconContent = styled.div.attrs(props => ({}))`
  width : 100%;
  display : flex;
  
  &>*:not(:first-child),  &>*:not(:last-child){
   // margin-right : 20px;
  }
`;

export const TextContent = styled.div.attrs(props => ({
    basis : props.basis
}))`
  width : 100%;
  
  &>p{
    transition : color 0.5s ease;
    
    
  }
  
  @media (min-width: 768px){
    &>p{
        //text-align : left !important;
    }
  }
`;

export const Icon = styled(IconCommon).attrs(props => ({}))``;

export const Below = styled.div.attrs(props => ({
}))`
 // background: blue;
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
    //max-width : 630px;
  }
`;


export const Above = styled.div.attrs(props => ({}))`
    z-index : 5;
    position:relative;
    width : 100%;
    transition : all 0.5s ease;
   // background : red;
    
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
    basis : props.basis,
    border : props.border,
    photo : props.photo,
    heightBelow : props.heightBelow

}))`
  cursor : pointer;
  transition : all 0.5s ease;
    -webkit-transform: translate3d(0,0,0);
  transform : scale(1);
  opacity : 1;
  position : relative;
  overflow : hidden;
  //background : white;
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
 
 &:not(.selected){
    z-index : 1;
    transition :all 0.5s ease;
 }
  
 
 
 ${ props => props.responsive.map((size, i) => `
     @media ${ device[size] } {
       // background-color: rgba(255,255,255,0);
    
        ${ props.border[size].radius ? `
     
        ${ props.border[size].radius.topLeft && props.border[size].radius.topLeft !== '0'  ?
            `border-top-left-radius :${ isNumber(props.border[size].radius.topLeft)
                ? `${ props.border[size].radius.topLeft }px;`
                : `${ props.border[size].radius.topLeft };`}`
         : ''}
         
        ${ props.border[size].radius.topRight && props.border[size].radius.topRight !== '0'  ?
            `border-top-right-radius :${ isNumber(props.border[size].radius.topRight)
                ? `${ props.border[size].radius.topRight }px;`
                : `${ props.border[size].radius.topRight };`}`
         : ''}
         
        ${ props.border[size].radius.bottomRight && props.border[size].radius.bottomRight !== '0'  ?
            `border-bottom-right-radius :${ isNumber(props.border[size].radius.bottomRight)
                ? `${ props.border[size].radius.bottomRight }px;`
                : `${ props.border[size].radius.bottomRight };`}`
         : ''}
         
        ${ props.border[size].radius.bottomLeft && props.border[size].radius.bottomLeft !== '0'  ?
            `border-bottom-left-radius :${ isNumber(props.border[size].radius.bottomLeft)
                ? `${ props.border[size].radius.bottomLeft }px;`
                : `${ props.border[size].radius.bottomLeft };`}`
         : ''}
     
     ` : ''}

        & ${Contain}{
            background-color: rgba(0,0,0,0.0);
            ${ props.border ?  generateBorder(props.border, size) : '' }    
            ${ props.border ?
                ( props.border[size].color ? `border-color : ${ getFormatedColor(props.border[size].color, props.border[size].opacity ) }; ` : '' )
            : ''}
            box-shadow : ${ props.basis[size].shadow.value || '0px 5px 5px 5px rgba(0, 0, 0, 0.0)' };
            
            & ${Above}{
                 & ${TextContent}{
                            background-color: ${ props.basis && props.basis[size].color ? getFormatedColor(props.basis[size].color, props.basis[size].opacity) : 'rgba(255,255,255,1)' };
                 }   
                & ${Portrait}{
                    //background-color: ${ props.basis && props.basis[size].color ? getFormatedColor(props.basis[size].color, props.basis[size].opacity) : 'rgba(0,0,0,0.0)' };

                    &:before{
                       background-color: ${ props.photo && props.photo[size].color ? getFormatedColor(props.photo[size].color, { value : 0}) : 'rgba(255,0,0,0.0)' };

                    }
                }
            }
            
            & ${Below}{
                background-color: ${ props.basis && props.basis[size].color ? getFormatedColor(props.basis[size].color, props.basis[size].opacity) : 'rgba(255,255,255,1)' };
            }
        }
        &.selected{
            z-index : 2;
            background-color: ${ props.basis && props.basis[size].color ? getFormatedColor(props.basis[size].color, props.basis[size].opacity) : 'rgba(255,255,255,1)' };

             & ${Contain}{
                 background-color: ${ props.basis && props.basis[size].color ? getFormatedColor(props.basis[size].color, props.basis[size].opacity) : 'rgba(0,0,0,0.0)' };
                 
                & ${Above}{
                    & ${TextContent}{
                        background-color: ${ props.basis && props.basis[size].color ? getFormatedColor(props.basis[size].color, { value : 0 }) : 'rgba(255,255,255,1)' };
                    }
                
                    & ${Portrait}{
                        min-height : 200px;
                        transition-delay : 0.0s;
                    
                        &:before{
                           background-color: ${ props.photo && props.photo[size].color ? getFormatedColor(props.photo[size].color, props.photo[size].opacity) : 'rgba(0,0,0,0.5)' };
                           transition : all 0.5s 0.0s ease;
                        }
                        &:after{
                            filter : blur(10px);
                            -webkit-filter: blur(10px);
                        }
                    }
                }
            }
        }  
     }
 
 
 
 ` )}
 
 
 @media (min-width: 768px){
    min-height : 560px;
    overflow : visible;
    ${ Contain }{
        position : absolute;
        //background : white;
        transition : all 0.5s 0.2s ease, background-color 0.0s 0.7s ease, width 0.5s 0.0s ease;

       // transition-delay : 0.2s;
    }
    &.selected{
        ${ Contain }{
            height : 100%;
            transition : all 0.5s 0.0s ease, background-color 0.0s 0.0s ease, width 0.5s 0.0s ease;

            //transition-delay : 0.0s;
            
            
        }
     }
 }
 @media (max-width: 767px){
    box-shadow : ${props =>  props.basis.M.shadow.value || '0px 5px 5px 5px rgba(0, 0, 0, 0.0)' };

    & ${ Contain }{
        background-color: ${ props =>  props.basis && props.basis.M.color ? getFormatedColor(props.basis.M.color, props.basis.M.opacity) : 'rgba(255,255,255,1)' };

        & ${Below}{
            min-height : calc(100% - 200px);
            //background-color: ${ props =>  props.basis && props.basis.M.color ? getFormatedColor(props.basis.M.color, props.basis.M.opacity) : 'rgba(255,255,255,1)' };
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
                            //width: calc(((100vw - (2 * ${props.flex[size].properties.gutterHorizontal}px)) / ${props.flex[size].properties.columns } - ${   ((props.flex[size].properties.columns - 1) * props.flex[size].properties.gutterHorizontal) / props.flex[size].properties.columns }px ) * 2);
                            width: calc(((100vw - ( 1 * ${props.flex[size].properties.gutterHorizontal}px / 2)) / ${props.flex[size].properties.columns } - ${   ((props.flex[size].properties.columns - 1) * props.flex[size].properties.gutterHorizontal) / props.flex[size].properties.columns }px ) * 2);
                        }
                    }
                }
                
                & ${Card}.selected{
                    & ${ Contain}{
                         //width: calc(((100vw - (2 * ${props.flex[size].properties.gutterHorizontal}px)) / ${props.flex[size].properties.columns } - ${   ((props.flex[size].properties.columns - 1) * props.flex[size].properties.gutterHorizontal) / props.flex[size].properties.columns }px ) * 2);
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
             
             & ${Card}{
                
             }
             
             & ${Card}.selected{
                

                & ${ Contain }{
                    -webkit-box-shadow: 0px 20px 40px 0px rgba(45,69,112,0.4);
                    -moz-box-shadow: 0px 20px 40px 0px rgba(45,69,112,0.4);
                    box-shadow: 0px 20px 40px 0px rgba(45,69,112,0.4);
                    
                    & ${ Above }{
                        
                        & ${ Portrait}{
                            
                            
                            
                            
                        }
                        
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
    
    @media (min-width: 768px) and (max-width : 1023px) {
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
                           // width: calc(((100vw - (2 * ${props.flex['T'].properties.gutterHorizontal}px)) / ${( props.flex['T'].properties.columns - 1)  } - ${   ((( props.flex['T'].properties.columns - 1)  - 1) * props.flex['T'].properties.gutterHorizontal) / ( props.flex['T'].properties.columns - 1)  }px ) * 2);
                            width: calc(((100vw - ( 1 * ${props.flex['T'].properties.gutterHorizontal}px)) / ${( props.flex['T'].properties.columns - 1)  } - ${   ((( props.flex['T'].properties.columns - 1)  - 1) * props.flex['T'].properties.gutterHorizontal) / ( props.flex['T'].properties.columns - 1)  }px ) * 2);
                        }
                    }
                }
                
                & ${Card}.selected{
                    & ${ Contain}{
                         //width: calc(((100vw - (1 * ${props.flex['T'].properties.gutterHorizontal}px)) / ${( props.flex['T'].properties.columns - 1)  } - ${   ((( props.flex['T'].properties.columns - 1)  - 1) * props.flex['T'].properties.gutterHorizontal) / ( props.flex['T'].properties.columns - 1)  }px ) * 2);
                         width: calc(((100vw - ( 1 * ${props.flex['T'].properties.gutterHorizontal}px)) / ${( props.flex['T'].properties.columns - 1)  } - ${   ((( props.flex['T'].properties.columns - 1)  - 1) * props.flex['T'].properties.gutterHorizontal) / ( props.flex['T'].properties.columns - 1)  }px ) * 2);
                    }
                }
                  
                  
            ` : '' }
    }
   
    @media ${ device.D } {
        ${ props => `
            & ${Card}{
                    & ${ Contain}{
                        & ${Below}{
                            //width: calc(((${ size.D } - (2 * ${props.flex['D'].properties.gutterHorizontal}px)) / ${props.flex['D'].properties.columns } - ${   ((props.flex['D'].properties.columns - 1) * props.flex['D'].properties.gutterHorizontal) / props.flex['D'].properties.columns }px ) * 2);
                            width: calc(((${ size.D } + ( 2 * ${props.flex['D'].properties.gutterHorizontal}px)) / ${props.flex['D'].properties.columns } - ${   ((props.flex['D'].properties.columns - 1) * props.flex['D'].properties.gutterHorizontal) / props.flex['D'].properties.columns }px ) * 2);
                        }
                    }
                }
                
                & ${Card}.selected{
                    & ${ Contain}{
                         //width: calc(((${ size.D } - (2 * ${props.flex['D'].properties.gutterHorizontal}px)) / ${props.flex['D'].properties.columns } - ${   ((props.flex['D'].properties.columns - 1) * props.flex['D'].properties.gutterHorizontal) / props.flex['D'].properties.columns }px ) * 2);
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