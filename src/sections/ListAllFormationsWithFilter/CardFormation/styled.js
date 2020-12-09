import styled from 'styled-components';
import {device} from "../../../styles/constants";
import {
    getFormatedColor,
    generateBorder,
    generateMargin,
    generatePadding,
    generateSize,
    generateBackgroundImage,
    generateBackgroundImageWebp,
    generateBackgroundImageWebpNoResponsive,
    generateBackgroundImageNoResponsive
} from "../../../utils/StyleGenerator";
import { CTACommon} from "../../../styles/common.styled";


export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    typographyCTA: props.typographyCTA,
    typographyTitle: props.typographyTitle,
}))`
    display : flex;
    position : relative;
    overflow : hidden;
   flex-direction : column;
   
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
    
           &:hover ${CTACommon}{
               
                & p{
                    color:${ getFormatedColor(props.typographyCTA[size].color.hover, props.typographyCTA[size].opacity.hover )};
                }
           }
           
           & svg{
                width : 10px;
                margin-right : 10px;
                align-self : flex-start;
                ${ props.typographyCTA[size].font.lineHeight ?
                `height : ${ props.typographyCTA[size].font.lineHeight }px;`
                : ''}
                
                & path{
                     ${ props.typographyTitle ? `fill :  ${ getFormatedColor(props.typographyTitle[size].color, props.typographyTitle[size].opacity) };` : ''}
                }
           }
             
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


export const ImageCard = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    responsiveContent: props.responsiveContent,
    asset : props.asset,
    assetsDirectory : props.assetsDirectory
}))`
    z-index : 2;
    margin-bottom : 10px;
    
    ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            ${ props.basis ? generateSize(props.basis, size) : '' }   
            
            &>*{
               ${ props.basis ? generateSize(props.basis, size) : '' }       
            }    
            ${ props.basis ? generatePadding(props.basis, size) : '' }       
            ${ props.basis ? generateMargin(props.basis, size) : '' }   
            ${ props.border ? generateBorder(props.border, size) : '' } 
            ${ props.border ?
    ( props.border[size].color ? `border-color : ${ getFormatedColor(props.border[size].color, props.border[size].opacity ) }; ` : '' )
    : ''}
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
                   background-color: ${ getFormatedColor(props.basis[size].color, props.basis[size].opacity) };

              ` : ''}
              
              ${props.noBackground ? `
                border-top : 1px solid rgba(0,0,0,0.5);

              ` : ''}

         
         }`)
    }; 
`;

export const NextSessionPromo = styled(NextSession)`
   padding : 10px 10px 10px 10px;
`

export const NextSessionDefault = styled.div`
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
