import styled from 'styled-components';
import { device } from '../../styles/constants';
import {ContainerCommon, ImageContainerCommon} from "../../styles/common.styled";
import {generateBackgroundImageWebp, generateBackgroundImage} from "../../utils/StyleGenerator";

export const Container = styled(ContainerCommon)`
    align-items : flex-start;
    justify-content  : center;
`;

export const ContainerImage = styled.div.attrs(props => ({
    responsiveContent: props.responsiveContent,
    asset: props.asset,
    assetsDirectory: props.assetsDirectory
}))`
    
    position : relative;
    
    ${ props => ['T', 'D'].map(size => `
        @media ${ device[size] } {
            height: inherit;
            
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
        }`

)};


    ${ props => ['M'].map(size => `
        @media ${ device[size] } {
             height: 0;
        }`

    )};
`;

export const Layout = styled.div.attrs(props => ({

}))`
    display : flex;
    width : 100%;

   ${ props => ['T', 'D'].map(size => `
        @media ${ device[size] } {
            flex-direction : row;
            
            &>${Container}{
                width : calc(100% / 3);
                
                ${ImageContainerCommon}{
                    display : none;
                }
            }
            &>${ContainerImage}{
                width : calc(100% * (2/3));
            }
        }`

)};
    
   ${ props => ['M'].map(size => `
        @media ${ device[size] } {
            flex-direction : column;
        }`

)};

    
`;
export const CallToActions = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
    transition : all 0.25s ease;
    border-style : solid;
    display : flex;
    align-items: center;
    z-index : 2;
    flex-wrap : wrap;
    
    & p, & i{
       transition : all 0.25s ease;
    }
    
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            justify-content:${ props.basis[size].alignment.horizontal || '' };
        }`)};
`;
