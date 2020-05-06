import styled from 'styled-components';
import {device} from "../../../styles/constants";
import {
    getFormatedColor,
    generateBorder,
    generateMargin,
    generatePadding,
    generateSize, generateBackgroundImage
} from "../../../utils/StyleGenerator";

export const ImageBackground = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    responsiveContent: props.responsiveContent,
    asset : props.asset,
    assetsDirectory : props.assetsDirectory
}))`
    overflow : hidden;
    z-index : 2;
    transition : transform 0.25s 0s cubic-bezier(0.32, 0.01, 0, 1);
    
    ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.basis ? generateSize(props.basis, size) : '' }        
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' }   
            ${ props.border ? generateBorder(props.border, size) : '' } 
            ${ props.border ?
    ( props.border[size].color ? `border-color : ${ getFormatedColor(props.border[size].color, props.border[size].opacity ) }; ` : '' )
    : ''}
               
            align-self:${ props.basis[size].alignment.horizontal || '' };
         
         }`)
    }; 
    
    ${ props =>  `
            background-image : url(${ `${ props.assetsDirectory  || ''}${  props.asset }`});    
            background-size : cover;
            background-position : center;
            background-position : center;
            background-repeat : no-repeat;
         }
         }`
    };  
`;

export const Formation = styled.div.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    asset: props.asset,
    assetsDirectory: props.assetsDirectory,
    basis: props.basis,
    border : props.border
}))`
   height :auto;
   display : flex;
   position : relative;
   overflow : hidden;
   flex-direction : row;
   
   @media  ${ device.M }{
        flex-direction : column;
   }
   
   &:hover{
        ${ ImageBackground}{
            transform : scale(1.05, 1.05);
        }
    
    }
   
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            ${ props.basis ? generateSize(props.basis, size) : '' }       
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' } 
            ${ props.border ?  generateBorder(props.border, size) : '' }    
            ${ props.border ?
    ( props.border[size].color ? `border-color : ${ getFormatedColor(props.border[size].color, props.border[size].opacity ) }; ` : '' )
    : ''}
            ${ props.basis &&  props.basis[size].shadow ?
    (  props.basis[size].shadow.value !== 'none' ? `box-shadow : ${ props.basis[size].shadow.value }; ` : '' )
    : ''}
             
            &:after{
               z-index : 1;
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

    ${ props => props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
            ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}  
         }`)
    };
`;

export const LeftContent = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
   z-index : 2;
   overflow : hidden;
   
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.basis ? generateSize(props.basis, size) : '' }        
         }`)
    }; 
`;


export const RightContent = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
   z-index : 2;
   
   ${ props => ['T', 'D'].map(size => `
        display : flex;
        flex-direction : column;
         @media ${ device[size] } {
            max-width : calc(100% - ${ props.basis[size].size.width });
         }`)
    }; 
    
    
`;

