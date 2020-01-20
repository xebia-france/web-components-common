import styled from 'styled-components';
import {device} from '../../styles/constants';
import {
    generateSize,
    generatePadding,
    generateMargin,
    generateBorder
} from "../../utils/StyleGenerator";
import isEmpty from 'lodash/isEmpty'

export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    asset: props.asset,
    assetsDirectory: props.assetsDirectory,
    basis: props.basis,
    border : props.border
}))`
   width : 100%;
   height :auto;
   display : flex;
   flex-direction : column;
   align-items : center;
   justify-content  : center;
   position: fixed;
   bottom : 0;
   right : 0;
   overflow : hidden;
   cursor : pointer;
   z-index : 30;
   transition : opacity .2s ease;
   opacity : 0;
   
   &.display{
        opacity : 1;
   }
   
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
         
            ${ props.basis ? generateSize(props.basis, size) : '' }       
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
            ${ props.border ?  generateBorder(props.border, size) : '' }        
            ${ props.border ? 
                    ( props.border[size].color ? 
                        `border-color :${ props.border[size].color.rgb ? `rgba(${props.border[size].color.rgb},${props.border[size].opacity.value});` 
                                                                        : `${props.border[size].color.hex};`}` : '')
             : ''}
             
            &:before{
               z-index : 1;
               position : absolute;
               width : 100%;
               height : 100%;
               content : ''; 
               top : 0;
               left : 0;
               background-color:${ props.basis[size].color.rgb ? `rgba(${props.basis[size].color.rgb},${props.basis[size].opacity.value})` : props.basis[size].color.hex };
               transition : opacity .2s cubic-bezier(.25,.46,.45,.94) 0ms;
            }
         }`)
    };

${ props => props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
             ${ props.asset && props.asset[size].fileName ? 
                `background-image : url('${ props.asset[size].fileName ? `${props.assetsDirectory  || ''}${  props.asset[size].fileName }` : '' }');
                 background-size : cover;`
            : ''
            }
         }`)
    };
    
    
    &:hover{
        &:before{
            opacity : 0.7;
        }
    }
    
  
`;


export const ImageContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    border: props.border
}))`
    overflow : hidden;
    border-style : solid;
    z-index : 31;
    position : relative;
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
         
            ${ props.basis ? generateSize(props.basis, size) : '' }      
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' }   
            ${ props.border ? generateBorder(props.border, size) : '' }   
            
            ${ props.border[size].color ? `border-color :${ props.border[size].color.rgb ? `rgba(${props.border[size].color.rgb},${props.border[size].opacity.value});` : `${props.border[size].color.hex};`}` : ''}
                
            align-self:${ props.basis[size].alignment.horizontal || '' };
          
            &>img{
                ${  isEmpty(props.basis[size].size.width) ? `
                    width : auto;
                    height : 100%; 
                
                ` : (!isEmpty(props.basis[size].size.width) && !isEmpty(props.basis[size].size.height) ? `
                    width : 100%;
                    height : 100%;
                ` : `
                    width : 100%;
                    height : auto;
                `)   }
            } 
         }`)
    };     
`;

