import styled from 'styled-components';
import {
    generatePadding,
    generateBorder,
    generateBackgroundImage, generateBackgroundImageWebp, getFormatedColor
} from "../../utils/StyleGenerator";

import {device, size, theme} from "../../styles/constants";

let grey50 = '#A2A2A2';
export let red = '#FE414D';
let baseHeight = 60;

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
            }
            .no-webp &:before{
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
   height : ${baseHeight}px;
   border-bottom : 1px solid grey;
   
`;

export const DashContainer = styled.div.attrs(props => ({

}))`
   background : white;

   &>div:nth-child(2){
   // border-top : 1px solid grey;
   }
   &>div:last-child{
       width : 5px;
   }
   
   
   
`;


export const Head = styled.div.attrs(props => ({

}))`
    background-color : ${theme.grey90};
    padding-left : 20px;
    padding-right : 20px;
    height : 40px;
    display : flex;
    align-items : center;
    justify-content : center;
    color : white;
`;

export const Column = styled.div.attrs(props => ({
}))``;


export const HeadSchedule = styled.div.attrs(props => ({

}))`
  display : flex;
`;


export const Schedule = styled.div.attrs(props => ({

}))`
  display : flex;
  flex-direction : column;
  position : relative;
  
  
`;




export const Label = styled.div.attrs(props => ({

}))`
  width : 35px;
  min-width: 35px;
  height : 40px;
  background : black;
  
  & p{
    color : white;
    transform : rotate(-90deg);
    text-align : center;
    font-size : 11px;
    margin-top : 5px;
  }
  
  @media ${ device['M'] } {
      width : 25px;
      min-width: 25px;
  }
`;


export const HoursLine = styled.div.attrs(props => ({

}))`
  width : 35px;
  min-width : 35px;
  //height : auto;
  height : fit-content;
  display : flex;
  flex-direction : column;
  border-right : 1px solid grey;
  z-index: 20;
  transition : margin-right 0.0s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
  background : white;
  
  &>div{
  
    position : relative;
    display : flex;
    flex-direction : column; 
    align-items : flex-end;
    
    &:first-child{
         
        
        &>p{
            position : relative;
            top : auto;
            right : auto;
            line-height : 35px;
            margin-top : 0px;
        }
    }
    
    &:nth-child(2){
       // margin-top : 10px;
    }
    
    &>p{
        position : absolute;
        top : -12px;
        right : 10px;
    }
    
  }
  
  & ${Label}{
    position : sticky;
    z-index : 5;
    top: 0;
  }
  
  @media ${ device['M'] } {
      width : 25px;
      min-width : 25px;
      
      &>div{
        &:first-child{
            &>p{
                line-height : 28px;
                padding-top : 10px;
            }
        }
        
        
       &>p{
         font-size : 12px;
         right : 8px;
       } 
      }
   }
`;





export const Day = styled.div.attrs(props => ({

}))`
  background-color : ${grey50};
  border-right: 1px solid rgba(255,255,255,0.5);
  padding-left : 20px;
  padding-right : 20px;
  height : 40px;
  color : white;
  cursor : pointer;
  display : flex;
  width : 100%;
  align-items : center;
  justify-content : center;
  
  &.active{
    background-color : ${red};
  }
  
`;


export const Days = styled.div.attrs(props => ({

}))`
  width :calc(100% - 35px - 80px);
  background : black;
  display : flex;
  
  
  & ${Day}:last-child{
    border-right : none;
  }
  
  @media ${ device['M'] } {
       width :calc(100% - 25px);
  }
`;




export const Header = styled.div.attrs(props => ({
}))`
 display : flex;
 justify-content : space-between;
 align-items : center;
`;

export const Tag = styled.div.attrs(props => ({
}))`
    display : flex;
    height : 20px;
    flex-wrap : wrap;
    overflow : hidden;
    
   &>div{
        height : 20px;
        line-height : 20px;
        border-radius : 2px;
        padding-left : 7px;
        padding-right : 7px;
        font-size : 12px;
        display : flex;
        align-items: center;
        color : white;
        
        &:first-child{
            text-transform  : uppercase;
            background : rgba(0,0,0,0.8);

        }
        
        
        &:not(:first-child){
            background : ${theme.grey60};
            margin-left : 5px;
        }
   }
 
`;

export const Time = styled.div.attrs(props => ({
}))`
 font-size : 12px;
 line-height : 15px;
 display : flex;
 min-width : 95px;
 opacity : 0.7;
 
`;

export const Clock = styled.div.attrs(props => ({
}))`
 width : 11px;
 height : 11px;
 margin-right : 4px;
 display : flex;
 align-self : center;
 
 &>svg{
    width : 100%;
    height : 100%;
 }
 
`;


export const SlotsContainer = styled.div.attrs(props => ({

}))`
  position : relative;
  
`;

export const Informations = styled.div.attrs(props => ({
}))`
 display : flex;
 flex-direction : column;
 
  & h4{
    font-size : 14px;
    line-height : 18px;
    margin-top : 5px;
    
    &.cropped{
        overflow:hidden; 
        white-space:nowrap; 
        text-overflow:ellipsis; 
    }
   
  }
  & h5{
    font-size : 12px;
    line-height : 13px;
    opacity : 0.4;
    margin-top : 5px;
  }
  
`;
export const SlotContent = styled.div.attrs(props => ({
    duration: props.duration,
}))`
 
  background : white;
  display : flex;
  flex-direction : column; 
  height : 100%;
  border-radius : 4px;
  padding : 6px;
  color : black;
  overflow : hidden;
  
  
`;

export const Slot = styled.div.attrs(props => ({
    duration: props.duration,
    hours: props.hours,
    minutes: props.minutes,

}))`
  ${ props => `
    height : calc((${baseHeight}px / 15) * ${ props.duration});
    top : calc( (${baseHeight}px / 15) * ${props.minutes});
  
  
  `}
  width : 100%;
  padding : 4px;
  position : absolute;
  z-index: 3;
  
  &.other{
    z-index : 1;

    & ${SlotContent}{
        background : ${red};
        color : white;
        
        & ${Clock} svg path{
            fill : white !important;
        }
        
        & ${ Informations}{
        
        }
    }
  }
  &:not(.other){
    width : calc(100% - 8px);
    margin-left : 4px;
  }
  
  &.filtered{
     &>div:before{
       z-index : 0;
       position : absolute;
       width : calc(100% - 6px);
       height : calc(100% - 6px);
       content : ''; 
       top : 3px;
       left : 3px;
       background : rgba(0,0,0,0.3);
       border-radius : 4px;
    }
    
    
    
    
  }
`;



export const ShadowLeft = styled.div.attrs(props => ({
    nbrQuarters : props.nbrQuarters

}))`
    position : absolute;
    top : 0;
    left : 35px;
    width : 25px;
    height : 100%;
    box-shadow: inset 180px 0px 10px -173px rgba(0,0,0,0.51);
    opacity : 0;
    transition : opacity 0.2s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
    ${ props => props.nbrQuarters && props.nbrQuarters !== 0 ? `height :${props.nbrQuarters * baseHeight}px;` : ``}

    @media ${ device['M'] } {
      left : 25px;
    }
    
`;
export const ShadowRight = styled.div.attrs(props => ({
    nbrQuarters : props.nbrQuarters

}))`
    position : absolute;
    top : 0;
    right : 0;
    width : 25px;
    height : 100%;
    transform : scaleX(-1);
    box-shadow: inset 180px 0px 10px -173px rgba(0,0,0,0.51);
    opacity : 0;
    transition : opacity 0.2s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
    ${ props => props.nbrQuarters && props.nbrQuarters !== 0 ? `height :${props.nbrQuarters * baseHeight}px;` : ``}

`;

export const BodySchedule = styled.div.attrs(props => ({
    responsive: props.responsive,
    nbrColumn : props.nbrColumn,
    index : props.index,
    nbrQuarters : props.nbrQuarters,
    filter : props.filter

}))`
  display : flex;
  overflow : hidden;
  position : relative;
  overflow-y : scroll;
  height : 70vh;
  cursor : pointer;
  border-bottom: 1px solid ${grey50};
  background: ${theme.grey20};
  
  ${props => props.filter ? `background : ${theme.grey60}; ` : ''}
  
  & ${Column}{

        & ${Head}{
            border-right: 1px solid rgba(255,255,255,0.5);
        }
    
  
  
  }
  
  &>div:nth-child(2){    
  
    &>div>div {
        ${ props => props.nbrQuarters && props.nbrQuarters !== 0 ? `height :${props.nbrQuarters * baseHeight}px;` : ``}

        & ${ Column }{
           & ${ SlotsContainer }{
              & ${ Slot }{
                  &.other{
                        padding-left : 0px;
                        padding-right : 0px;
                       & ${SlotContent}{
                           border-radius : 0px;
                           
                           &:before{
                             border-radius : 0px;
                           }
                           
                           & ${ Tag }>div, & ${ Time }, & ${ Informations }{
                                display : none;
                           }
                       } 
                  }
               }
            } 
         }
    
        &:first-child{
           & ${ Column }{
                    & ${ SlotsContainer }{
                        & ${ Slot }{
                            padding-left : 4px;
                            padding-right : 0px;
                            width : calc(100% - 12px);
                            
                            &.other{
                                padding-left : 8px;
                                padding-right : 0px;
                                width : 100%;
                                & ${SlotContent}{
                                   border-radius :4px 0px 0px 4px;
                                   &:before{
                                      border-radius :4px 0px 0px 4px;
                                      width : calc(100% - 8px);
                                      height : calc(100% - 8px);
                                      left : 8px;
                                      top : 4px;
                                   }
                                   & ${Tag}>div, & ${Informations}{
                                        display : flex;
                                   }
                               } 
                            }
                            &:not(.other){
                               & ${SlotContent}{
                                    &:before{
                                       width : calc(100% - 2px);
                                   }
                               }
                            }
                            
                        }
                    } 
            }
        }
        &:last-child{
           & ${ Column }{
                    & ${ SlotsContainer }{
                        & ${ Slot }{
                            padding-left : 4px;
                            padding-right : 4px;
                            
                            &.other{
                                padding-left : 0px;
                                padding-right : 8px;
                                & ${SlotContent}{
                                   border-radius :0px 4px 4px 0px;
                                   
                                   
                                   &:before{
                                      border-radius :0px 4px 4px 0px;
                                      width : calc(100% - 8px);
                                       height : calc(100% - 8px);
                                       top : 4px;
                                       left : 0px;
                                   }
                                   & ${Time}{
                                        display : flex;
                                   }
                               } 
                            }
                        }
                    } 
            }
        }
        
        & ${ Column }{
           & ${ SlotsContainer }{
              & ${ Slot }{
                  &.overlaped{
                        padding-left : 8px;
                        padding-right : 12px;
                        
                        & ${SlotContent}{
                            &:before{
                                width : calc(100% - 18px);
                                left : 7px;
                            }
                        }
                        
                       
                  }
                 
               }
            } 
         }
         
         ${props => props.nbrColumn === 1 ? `
            & ${ Column }{
                    & ${ SlotsContainer }{
                        & ${ Slot }{
                            padding-left : 4px !important;
                            padding-right : 4px !important;
                            
                            &.other{
                                padding-left : 8px !important;
                                padding-right : 8px !important;
                                & ${SlotContent}{
                                   border-radius :4px !important;
                                   
                                   
                                   &:before{
                                      border-radius :4px !important;
                                      width : calc(100% - 16px) !important;
                                      left : 8px !important;
                                   }
                               } 
                            }
                        }
                    } 
            }
         `: ''}
        
            
        
    }
    
    
             
  }
    
   @media (min-width: 1024px) {
   
        ${ props => props.index > 0 ? `
            & ${ShadowLeft}{
                opacity : 1;
            }
        ` : ``}
   
        ${ props => props.nbrColumn > 3 ? `
            ${ (props.nbrColumn - props.index) > 3 ? `
                & ${ShadowRight}{
                    opacity : 1;
                }
        ` : ``}
            
           & ${ HoursLine}{
             margin-right : ${ props.index === 0 ? ' -50px' : '0'};
           }  
        ` : ''}
        
        ${ props => props.nbrColumn == 2 ? `
            ${ (props.nbrColumn - props.index) <= 1 ? `
                & ${ShadowLeft}{
                    opacity : 0;
                }
        ` : ``}
            
          
        ` : ''}
        
        
        &>div:nth-child(2){
        
            ${ props => props.nbrColumn > 3 ? `
            
                ${ props.index === 0 ? `
                  padding :0 calc((100% - 35px - 0px) * (2/3) ) 0 50px !important;
                ` : `
                  padding : 0 calc((100% - 35px + 25px) * (2/3) ) 0 50px !important;`
                }
                
                ${ (props.nbrColumn - props.index) <= 3  ? `
                    &>div{
                        transform : translate(-${(props.nbrColumn - 3) * 100}%, 0px) !important;
                    }
                    padding : 0 calc((100% - 35px + 25px) * (2/3) ) 0 25px !important;
                    
                    

                    
                    
                ` : ``}
                  
                
            ` 
            : ''}
            ${ props => props.nbrColumn === 3 ? `
                padding :0 calc((100% - 35px) * (2/3)) 0 0 !important;
                &>div{
                    transform : translate(0%, 0px) !important;
                }
            ` : ''}
            ${ props => props.nbrColumn === 2 ? `
                padding :0 calc((100% - 35px) * (1/2)) 0 0 !important;
                &>div{
                    transform : translate(0%, 0px) !important;
                }
            ` : ''}
            ${ props => props.nbrColumn === 1 ? `
                padding :0 0 0 0 !important;
                &>div{
                    transform : translate(0%, 0px) !important;
                }
            ` : ''}
            
            
            
        }
        
             
    }
   @media (min-width: ${size.T}) and (max-width: 1023px) {
   
        ${ props => props.index > 0 ? `
            & ${ShadowLeft}{
                opacity : 1;
            }
        ` : ``}
   
        ${ props => props.nbrColumn > 2 ? `
            ${ (props.nbrColumn - props.index) > 2 ? `
                & ${ShadowRight}{
                    opacity : 1;
                }
        ` : ``}
            
           & ${ HoursLine}{
             margin-right : ${ props.index === 0 ? ' -50px' : '0'};
           }  
        ` : ''}
        
        
        &>div:nth-child(2){
        
            ${ props => props.nbrColumn > 2 ? `
            
                ${ props.index === 0 ? `
                  padding :0 calc((100% - 35px - 0px) * (0.53) ) 0 50px !important;
                ` : `
                  padding : 0 calc((100% - 35px + 25px) * (0.53) ) 0 50px !important;`
                }
                
                ${ (props.nbrColumn - props.index) <= 2  ? `
                    &>div{
                        transform : translate(-${(props.nbrColumn - 2) * 100}%, 0px) !important;
                    }
                    padding : 0 calc((100% - 35px + 25px) * (0.53) ) 0 25px !important;

                    
                    
                ` : ``}
                  
                
            ` 
            : ''}
            
            ${ props => props.nbrColumn === 2 ? `
                padding :0 calc((100% - 35px) * (1/2)) 0 0 !important;
                &>div{
                    transform : translate(0%, 0px) !important;
                }
            ` : ''}
            ${ props => props.nbrColumn === 1 ? `
                padding :0 0 0 0 !important;
                &>div{
                    transform : translate(0%, 0px) !important;
                }
            ` : ''}
            
            
            
        }
             
    }
    
    
    @media ${device.M} {
   
        ${ props => props.index > 0 ? `
            & ${ShadowLeft}{
                opacity : 1;
            }
        ` : ``}
   
        ${ props => props.nbrColumn > 1 ? `
            ${ (props.nbrColumn - props.index) > 1 ? `
                & ${ShadowRight}{
                    opacity : 1;
                }
        ` : ``}
            
           & ${ HoursLine}{
             margin-right : ${ props.index === 0 ? ' -50px' : '0'};
           }  
        ` : ''}
        
        
        &>div:nth-child(2){
        
            ${ props => props.nbrColumn > 1 ? `
            
                ${ props.index === 0 ? `
                  padding :0 calc((100% - 35px - 0px) * (1/8) ) 0 50px !important;
                ` : `
                  padding : 0 calc((100% - 35px + 25px) * (1/8) ) 0 50px !important;`
                }
                
                ${ (props.nbrColumn - props.index) <= 1  ? `
                    &>div{
                        transform : translate(-${(props.nbrColumn - 1) * 100}%, 0px) !important;
                    }
                    padding : 0 calc((100% - 35px + 25px) * (1/8) ) 0 25px !important;

                    
                    
                ` : ``}
                  
                
            ` 
            : ''}
            
            ${ props => props.nbrColumn === 1 ? `
                padding :0 0 0 0 !important;
                &>div{
                    transform : translate(0%, 0px) !important;
                }
            ` : ''}
            
            
            
        }
             
    }
    
    @media (max-width: 479px) {
   
        ${ props => props.index > 0 ? `
            & ${ShadowLeft}{
                opacity : 1;
            }
        ` : ``}
   
        ${ props => props.nbrColumn > 1 ? `
            ${ (props.nbrColumn - props.index) > 1 ? `
                & ${ShadowRight}{
                    opacity : 1;
                }
        ` : ``}
            
           & ${ HoursLine}{
             margin-right : ${ props.index === 0 ? ' -50px' : '0'};
           }  
        ` : ''}
        
        
        &>div:nth-child(2){
        
            ${ props => props.nbrColumn > 1 ? `
            
                ${ props.index === 0 ? `
                  padding :0 calc((100% - 35px - 300px) * (1/8) ) 0 50px !important;
                ` : `
                  padding : 0 calc((100% - 35px + 0px) * (1/8) ) 0 20px !important;`
                }
                
                ${ (props.nbrColumn - props.index) <= 1  ? `
                    &>div{
                        transform : translate(-${(props.nbrColumn - 1) * 100}%, 0px) !important;
                    }
                    padding : 0 calc((100% - 35px + 0px) * (1/8) ) 0 20px !important;

                    
                    
                ` : ``}
                  
                
            ` 
            : ''}
            
            ${ props => props.nbrColumn === 1 ? `
                padding :0 0 0 0 !important;
                &>div{
                    transform : translate(0%, 0px) !important;
                }
            ` : ''}
            
            
            
        }
             
    }
    
    
    & ${Head}{
        opacity : 0;
        height : 0;
    }
    
  
`;

export const BodyRooms =  styled(BodySchedule).attrs(props => ({
    translatePosition: props.translatePosition,
    transition : props.transition
}))`
    height : auto;
    border-bottom:none;
    
    & ${Head}{
        opacity : 1;
        height : 40px;
    }
    
    /*&>div:nth-child(2)>div{
        ${props => props.translatePosition ?
    `transform : ${props.translatePosition} !important;` : ''}
     
     ${props => props.transition ?
    `transition : ${props.transition} !important;` : ''}
    }*/
    
    
    
    
`


export const Grid = styled.div.attrs(props => ({
}))`
  position : absolute;
  width:  100%;
  height : 100%;
  opacity : 0.2;
  
  & ${ DashContainer}{
    background : none;
    width : 100%;
    border-right : 1px solid grey;
    
    & p{
        display : none;
    }
    
    &>div:last-child{
       width : 100%;
   }
  }
  
  &:last-child{
    &>div:last-child{
      // width : 0;
   }
  }
  
  & ${ Dash}{
    background : none;
    width : 0;
    
  }
  
`;
export const Filters = styled.div.attrs(props => ({
}))`
  position : absolute;
  background : ${theme.grey90};
  border-radius : 15px;
  display : flex;
  padding : 0 5px;
  padding-top : 5px;
  bottom : 10px;
  align-self : center;
  max-width : 80%;
  flex-wrap : wrap;
  justify-content : center;
  
  &>div{
    background :${theme.grey60};
    border-radius : 10px;
    text-transform : uppercase;
    font-size : 14px;
    line-height : 16px;
    display : flex;
    height : 20px;
    align-items : center;
    color : ${theme.white};
    padding : 0 10px;
    cursor : pointer;
    transition : background 0.2s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
    margin-bottom : 5px;
    

    
    &:not(:first-child){
       margin-left : 5px;
    }
    
    &:hover{
        background : ${red};
    }
    &.active{
        background : ${red};
    }
  }
  
        
        
        
  
`;

export const ToLeft = styled.div.attrs(props => ({
}))`
    transition : background 0.2s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
    opacity : 0.2;
    width : 40px;
    height : 40px;
    display : flex;
    align-items : center;
    justify-content : center;
    pointer-events: none;
    
    &>svg{
        transform : rotate(90deg);
    }
`;


export const ToRight = styled.div.attrs(props => ({
}))`
    transition : background 0.2s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
    opacity : 0.2;
    width : 40px;
    height : 40px;
    display : flex;
    align-items : center;
    justify-content : center;
    pointer-events: none;
    
    &>svg{
        transform : rotate(-90deg);
    }
`;


export const SwitchButtons = styled.div.attrs(props => ({
    nbrColumn : props.nbrColumn,
    index : props.index
}))`
  background : ${theme.white};
  width : 80px;
  display : flex;
  align-items :center;
  justify-content : center;
  
  ${ props => props.index > 0 ? `
            & ${ToLeft}{
                opacity : 1;
                cursor :pointer;
                pointer-events: auto;
                &:hover svg path{
                    fill : ${red};
                }
            }
  ` : ``}
  
  @media ${ device['M'] } {
      display : none;
  }
  
  @media (min-width: 1024px) {
   
        ${ props => props.nbrColumn > 3 ? `
            ${ (props.nbrColumn - props.index) >  3   ? `
                & ${ToRight}{
                    opacity : 1;
                    cursor :pointer;
                    pointer-events: auto;
                    &:hover{
                        background : ${red};
                        
                        & svg path{
                            fill : ${theme.white};
                        }
                    }
                }
            ` : ``}
        ` : ''}
    }
   @media (min-width: ${size.T}) and (max-width: 1023px) {
   
        ${ props => props.nbrColumn > 2 ? `
            ${ (props.nbrColumn - props.index) > 2 ? `
                & ${ToRight}{
                    opacity : 1;
                    cursor :pointer;
                    pointer-events: auto;
                    
                    &:hover{
                        background : ${red};
                        
                        & svg path{
                            fill : ${theme.white};
                        }
                    }
                }
            ` : ``}
        ` : ''}
    }
`;