import styled from 'styled-components';
import {device} from "../../../styles/constants";
import {
    getFormatedColor, generateBorderColor, generateBackground,
    generateBorder,
    generateMargin,
    generatePadding,
    generateSize,
    generateBackgroundImage,
    generateBackgroundImageWebp,
    generateBackgroundImageWebpNoResponsive,
    generateBackgroundImageNoResponsive, generateTextColor
} from "../../../utils/StyleGenerator";
import { CTACommon} from "../../../styles/common.styled";


export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    typographyCTA: props.typographyCTA,
}))`
    display : flex;
    flex-direction : column; 
    justify-content: space-between;

    ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            ${props.basis ? generateBackground(props.basis, size): ''}
            ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
              background:${ props.basis[size].color.gradient  };

           ` : ''}
           
           &:hover ${CTACommon}{
               
                & p{
                    ${props.typographyCTA ? generateTextColor(props.typographyCTA, size, 'hover') : ''}
                }
           }
            
         }`)
    };

`;


export const ImageCard = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    responsiveContent: props.responsiveContent,
    asset : props.asset,
    assetsDirectory : props.assetsDirectory
}))`
    z-index : 2;
    
    ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.basis ? generateSize(props.basis, size) : '' }   
            
            &>*{
               ${ props.basis ? generateSize(props.basis, size) : '' }       
            }    
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' }   
            ${ props.border ? generateBorder(props.border, size) : '' } 
            ${ props.border ? generateBorderColor(props.border, size) : '' } 
           
            align-self:${ props.basis[size].alignment.horizontal || '' };
         
         }`)
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
   flex-direction : column;
   
   @media  ${ device.M }{
        flex-direction : column;
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

export const Content = styled.div.attrs(props => ({

}))`
   z-index : 2;
   overflow : hidden;
   cursor : pointer;
   width : 100%;
   height : auto;
   display : flex;
   
   
`;

export const ContentCard = styled.div.attrs(props => ({

}))`
   display : flex;
   flex-direction :  column;   
`;

export const Badges = styled.div.attrs(props => ({

}))`
   display : flex;
   flex-direction :  column; 
   
   & ${ImageCard}:nth-child(2){
       margin-top : 10px;
   }  
`;

export const NextSession = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    noBackground : props.noBackground
}))`
   z-index : 8;
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
         
              ${ props.basis && props.basis[size].color && !props.noBackground ? `
                    ${props.basis ? generateBackground(props.basis, size): ''}
              ` : ''}
              
              ${props.noBackground ? `
                border-top : 1px solid rgba(0,0,0,0.15);

              ` : ''}

         
         }`)
    }; 
`;

export const NextSessionPromo = styled(NextSession)`
   padding : 10px 10px 10px 10px;
`

export const NextSessionDefault = styled(NextSession)`
   background : none;
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
