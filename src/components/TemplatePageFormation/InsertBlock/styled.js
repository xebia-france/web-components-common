import styled from "styled-components";
import {device} from "../../../styles/constants";
import {
    generateBackground,
    generateBorder, generateBorderColor,
    generateMargin,
    generatePadding,
    generateSize,
    getFormatedColor
} from "../../../utils/StyleGenerator";

export const Container = styled.div`
    display : flex;
    flex-direction : column;
    width : 100%;
`;


export const InsertBox = styled.div.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    basis: props.basis,
    border: props.border,
}))`
  width : 100%;
   height :auto;
   display : flex;
   flex-direction : column;
   position : relative;
   overflow : hidden;
   
   &>*:first-child{
    &>*{
        z-index : 2;
        position: relative;
    }
   }
   
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
         
            &>*:not(:first-child){
              ${ props.basis ? generatePadding(props.basis, size) : '' }       
            }
            
            ${ props.basis ? generateSize(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
            ${ props.border ?  generateBorder(props.border, size) : '' }    
            ${ props.border ?  generateBorderColor(props.border, size) : '' }    
            
            ${ props.basis &&  props.basis[size].shadow ?
            (  props.basis[size].shadow.value !== 'none' ? `box-shadow : ${ props.basis[size].shadow.value }; ` : '' )
            : ''}
             
           &>div:first-child{
                position : relative;
            }
            &>div:first-child:before{
               z-index : 1;
               position : absolute;
               width : 100%;
               height : 100%;
               content : ''; 
               ${ props.basis[size].background &&  props.basis[size].background.top ? `
                  top:${ props.basis[size].background.top  }px;
                ` : 'top : 0;'}
               left : 0;
               ${props.basis ? generateBackground(props.basis, size) : ''}
               ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background:${ props.basis[size].color.gradient  };

               ` : ''}
            }
         }`)
    };
 
`;

