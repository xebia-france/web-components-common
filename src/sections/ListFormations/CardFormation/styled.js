import styled from 'styled-components';
import {device} from "../../../styles/constants";
import {
    getFormatedColor,generateBorderColor, generateBackground,
    generateBorder,
    generateMargin,
    generatePadding,
    generateSize,
    generateBackgroundImage,
    generateBackgroundImageWebp,
    generateBackgroundImageWebpNoResponsive,
    generateBackgroundImageNoResponsive
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
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' }   
            ${ props.border ? generateBorder(props.border, size) : '' } 
            ${ props.border ? generateBorderColor(props.border, size) : '' } 
           
            align-self:${ props.basis[size].alignment.horizontal || '' };
         
         }`)
    }; 
    
    ${ props =>  `
    
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
               ${ props.asset ? generateBackgroundImageNoResponsive(props.asset, props.assetsDirectory) : ''}  
                background-size : cover;
                background-position : center;
                background-position : center;
                background-repeat : no-repeat;
            }
            .webp &:before{
               ${ props.asset ? generateBackgroundImageWebpNoResponsive(props.asset, props.assetsDirectory) : ''}  
                background-size : cover;
                background-position : center;
                background-position : center;
                background-repeat : no-repeat;
            }
         
         `
    };  
    
    width : 100%;
    height : 100%;
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
            ${ props.border ?  generateBorderColor(props.border, size) : '' }    
           
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
               ${props.basis ? generateBackground(props.basis, size): ''}
                ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background:${ props.basis[size].color.gradient  };

               ` : ''}
            }
         }`)
    };

    ${ props =>  props.responsiveContent ? props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
            
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
               ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}  
            }
            .webp &:before{
               ${ props.asset ? generateBackgroundImageWebp(props.asset, size, props.assetsDirectory) : ''}  
            }
         }`) : ''
    };
`;

export const LeftContent = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
   z-index : 2;
   overflow : hidden;
   position : relative;
   cursor : pointer;
   
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



export const NextSession = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
   z-index : 8;
   position : absolute;
   bottom : 0;
   width : 100%;
   display : flex;
   padding : 10px 10px 10px 10px;
   
   &>div:nth-child(1){
    width: calc(100% - 40px);
   }
   &>div:nth-child(2){
    width: 40px;
    display : flex;
    align-items : center;
   }
   
   
   ${ props => props.responsive.map(size => `
       
         @media ${ device[size] } {
              ${props.basis ? generateBackground(props.basis, size): ''}
             
         }`)
    }; 
`;

export const NextSessionPromo = styled(NextSession)`
   padding : 10px 10px 10px 10px;
`
export const IconContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    typography: props.typography
}))`
    width: 40px;
    height: 40px;
    z-index : 2;
    
    & svg{
        width: 40px;
        height: 40px;
    }
    
    ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            
         
            ${ props.typography ? `
                & svg path{ 
                  fill:${ getFormatedColor(props.typography[size].color, props.typography[size].opacity) };
            }
            ` : '' }       
            
         }`)
    };

`;
