import styled from 'styled-components';
import { grey80, red} from "../styled";
import {generateBackgroundImageWebpNoResponsive, generateBackgroundImageNoResponsive} from "../../../utils/StyleGenerator";

export const PopUpContainer = styled.div.attrs(props => ({
}))`
  position : fixed;
  top : 0;
  left : 0;
  width:  100%;
  height : 100%;
  background : rgba(0,0,0,0.7);
  z-index : 99;
  display : none;
  flex-direction : column;
  align-items : center;
  justify-content : center;
  
  &.open{
    display : flex;
  }
  
  
`;
export const Card = styled.div.attrs(props => ({
}))`
  display : flex;
  flex-direction :  column; 
  width : 50%;
  min-width : 500px;
  max-width : 100%;
  background :white;
  overflow : scroll;

`;


export const Banner = styled.div.attrs(props => ({
}))`
  display : flex;
  background : ${grey80};
  height : 40px;
  min-height : 40px;
  position : relative;
  
`;

export const Day = styled.div.attrs(props => ({
}))`
  display : flex;
  background : ${red};
  color : white;
  padding : 0px 20px;
  align-items : center;
  
`;

export const Room = styled.div.attrs(props => ({
}))`
  display : flex;
  color : white;
  padding : 0px 20px;
  align-items : center;
  text-transform : uppercase;
`;

export const Close = styled.div.attrs(props => ({
}))`
  color : white;
  position : absolute;
  top : 0;
  right : 0;
  height : 40px;
  width : 40px;
  cursor : pointer;
  
   &>div{
    width : 70%;
    height : 2px;
    margin-left : 15%;
    background : white;
    outline : 1px solid transparent;
    display : block;
    transform-origin : 50% 50%;
    position: absolute;
    top:50%;
    transition : transform .2s cubic-bezier(.25,.46,.45,.94) 0ms;
    border-radius : 2px;
  
    &:nth-child(1){
        transform : rotate(45deg);
    }
    &:nth-child(2){
        transform : rotate(-45deg);
    }
  }
  
  &:hover{
    &:nth-child(1){
        transform : rotate(0deg);
    }
    &:nth-child(2){
        transform : rotate(0deg);
    }
  }
`;



export const Content = styled.div.attrs(props => ({
}))`
  width : 100%;
  padding : 20px;
`;


export const Time = styled.div.attrs(props => ({
}))`
  display : flex;
  padding : 0px 10px;
  color : white;
  background : ${red};
  font-size : 14px;
  line-height : 16px;
  align-items : center;
`;


export const Duration = styled.div.attrs(props => ({
}))`
    display : flex;
    align-items : center;
    padding : 0 30px;
    font-size : 12px;
    lint-height : 16px;
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
export const InfoTime = styled.div.attrs(props => ({
}))`
 display : flex;
 
`;

export const Info = styled.div.attrs(props => ({
}))`
 display : flex;
 flex-direction : column;
 padding-top : 20px;
 
 &>h4{
    margin-bottom : 10px;
    font-size : 22px;
    line-height : 26px;
 }
 
`;
export const Summary = styled.p.attrs(props => ({
}))`
 margin-top : 50px;
 font-size : 14px;
 line-height : 24px;
 
`;
export const Speaker = styled.div.attrs(props => ({
}))`
    display : flex;
 & h4>span{
    text-transform : uppercase;
 }
 
 &>div:nth-child(2){
    width : 100%;
 }
 
`;
export const Image = styled.div.attrs(props => ({
    asset: props.asset,
    assetsDirectory: props.assetsDirectory,
}))`
 width : 40px;
 height : 50px;
 position : relative;
 
 &:before{
       z-index : 1;
       position : absolute;
       width : 100%;
       height : 100%;
       content : ''; 
       top : 0;
       left : 0;
    }
    .no-webp &:before{
       ${ props => props.asset ? generateBackgroundImageNoResponsive(props.asset, props.assetsDirectory) : ''}  
    }
    .webp &:before{
       ${ props => props.asset ? generateBackgroundImageWebpNoResponsive(props.asset, props.assetsDirectory) : ''}  
    }
 }
 
`;