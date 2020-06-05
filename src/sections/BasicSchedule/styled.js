import styled from 'styled-components';
import {device} from "../../styles/constants";
import {
    generatePadding,
    generateBorder,
    generateBackgroundImage, generateBackgroundImageWebp, getFormatedColor
} from "../../utils/StyleGenerator";

let grey80 = '#666666';
let grey50 = '#A2A2A2';
let red = '#FE414D';
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
   &>div:nth-child(2){
   // border-top : 1px solid grey;
   }
   &>div:last-child{
       width : 5px;
   }
   
`;


export const Head = styled.div.attrs(props => ({

}))`
    background-color : ${grey80};
    padding-left : 20px;
    padding-right : 20px;
    height : 40px;
    display : flex;
    align-items : center;
    justify-content : center;
    color : white;
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
  z-index: 20;
  transition : margin-right 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
  
  &>div{
  
   //eight : calc(${baseHeight}px * 4);
    position : relative;
    display : flex;
    flex-direction : column; 
    align-items : flex-end;
    
    &:first-child{
         height : 40px;
         
         align-items : center;
        
        &>p{
            position : relative;
            top : auto;
            right : auto;
            line-height : 35px;
            margin-top : 0px;
        }s
    }
    
    &:nth-child(2){
        margin-top : 10px;
    }
    
    &>p{
        position : absolute;
        top : -12px;
        right : 10px;
    }
    
    
    
  }
`;


export const HeadSchedule = styled.div.attrs(props => ({

}))`
  display : flex;
`;


export const Schedule = styled.div.attrs(props => ({

}))`
  display : flex;
  flex-direction : column;
  
  
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
    //height : 35px;
    //width : 40px;
    text-align : center;
    font-size : 11px;
    margin-top : 5px;
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



export const Header = styled.div.attrs(props => ({
}))`
 display : flex;
 justify-content : space-between;
 align-items : center;
`;

export const Tag = styled.div.attrs(props => ({
}))`
    display : flex;
    
   &>div{
        height : 20px;
        line-height : 20px;
        border-radius : 2px;
        padding-left : 4px;
        padding-right : 4px;
        font-size : 12px;
        display : flex;
        align-items: center;
        color : white;
        
        &:first-child{
            text-transform  : uppercase;
            background : rgba(0,0,0,0.8);

        }
        
        
        &:not(first-child){
            //margin-left : 3px;
            background : rgba(0,0,0,0.25);
            

        }
   }
 
`;

export const Time = styled.div.attrs(props => ({
}))`
 font-size : 12px;
 line-height : 16px;
 display : flex;
 
`;

export const Clock = styled.div.attrs(props => ({
}))`
 width : 10px;
 height : 10px;
 margin-right : 4px;
 
 &>svg{
    width : 100%;
    height : 100%;
 }
 
`;


export const Slots = styled.div.attrs(props => ({

}))`
  margin-top : 10px;
  position : relative;
  
`;

export const Informations = styled.div.attrs(props => ({
}))`
 display : flex;
 flex-direction : column;
 padding-top : 8px;
 
  & h4{
    font-size : 14px;
    
    &.cropped{
        overflow:hidden; 
        white-space:nowrap; 
        text-overflow:ellipsis; 
    }
   
  }
  & h5{
    font-size : 14px;
    opacity : 0.4;
    text-transform : uppercase;
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
`;



export const ShadowLeft = styled.div.attrs(props => ({


}))`
    position : absolute;
    top : 0;
    left : 35px;
    width : 25px;
    height : 100%;
    box-shadow: inset 180px 0px 10px -173px rgba(0,0,0,0.51);
    opacity : 0;
    transition : opacity 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;

`;
export const ShadowRight = styled.div.attrs(props => ({


}))`
    position : absolute;
    top : 0;
    right : 0;
    width : 25px;
    height : 100%;
    transform : scaleX(-1);
    box-shadow: inset 180px 0px 10px -173px rgba(0,0,0,0.51);
    opacity : 0;
    transition : opacity 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
`;

export const BodySchedule = styled.div.attrs(props => ({
    responsive: props.responsive,
    nbrColumn : props.nbrColumn,
    index : props.index

}))`
  display : flex;
  overflow : hidden;
  position : relative;
  
  & ${Column}{

        & ${Head}{
            border-right: 1px solid rgba(255,255,255,0.5);
        }
    
  
  
  }
  
  &>div:nth-child(2){    
    &>div>div {
        & ${ Column }{
           & ${ Slots }{
              & ${ Slot }{
                  &.other{
                        padding-left : 0px;
                        padding-right : 0px;
                       & ${SlotContent}{
                           border-radius : 0px;
                           
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
                    & ${ Slots }{
                        & ${ Slot }{
                            padding-left : 4px;
                            padding-right : 0px;
                            
                            &.other{
                                & ${SlotContent}{
                                   border-radius :4px 0px 0px 4px;
                                   
                                   & ${Tag}>div, & ${Informations}{
                                        display : flex;
                                   }
                               } 
                            }
                        }
                    } 
            }
        }
        &:last-child{
           & ${ Column }{
                    & ${ Slots }{
                        & ${ Slot }{
                            padding-left : 0px;
                            padding-right : 4px;
                            
                            &.other{
                                & ${SlotContent}{
                                   border-radius :0px 4px 4px 0px;
                                   
                                   & ${Time}{
                                        display : flex;
                                   }
                               } 
                            }
                        }
                    } 
            }
        }
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
        
        
        &>div:nth-child(2){
        
            ${ props => props.nbrColumn > 3 ? `
            
                ${ props.index === 0 ? `
                  padding :0 calc((100% - 35px - 0px) * (2/3) ) 0 50px !important;
                ` : `
                  padding : 0 calc((100% - 35px + 25px) * (2/3) ) 0 50px !important`
                }
                
                ${ (props.nbrColumn - props.index) <= 3  ? `
                    &>div{
                        transform : translate(-${(props.nbrColumn - 3) * 100}%, 0px) !important;
                    }
                    
                    
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
    
    
  
  
`;
