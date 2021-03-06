import styled from 'styled-components';
import { device } from '../../styles/constants';
import {ContainerCommon, TextCommon} from "../../styles/common.styled";
import { generateBackgroundImage, generateBackgroundImageWebp } from "../../utils/StyleGenerator";

export const Container = styled(ContainerCommon)`
    align-items : flex-start;
    justify-content  : center;
    
    ${ props =>  props.responsiveContent ? ['M'].map((size, i) => `
         @media ${ device[size] } {
                &:before{
                   z-index : 1;
                   position : absolute;
                   width : 100%;
                   ${ props.basis[size].padding &&  props.basis[size].padding.top ? `
                      height:${ props.basis[size].padding.top  }px;
                    ` : 'height : 0;'}
                   content : ''; 
                   ${ props.basis[size].background &&  props.basis[size].background.top ? `
                      top:${ props.basis[size].background.top  }px;
                    ` : 'top : 0;'}
                   left : 0;
               
                }
                .no-webp &:before{
                   ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}  
                }
                .webp &:before{
                   ${ props.asset ? generateBackgroundImageWebp(props.asset, size, props.assetsDirectory) : ''}  
                }
         
                background-image : none;
                
                &:after{
                   ${ props.basis[size].padding &&  props.basis[size].padding.top ? `
                      top:${ props.basis[size].padding.top  }px;
                      height: calc(100% - ${ props.basis[size].padding.top  }px);
                    ` : ''}
                   
                }
         }`) : ''
    };
    
    
`;

export const Contain = styled.div`
    z-index : 2;
    
    ${ props =>  ['T', 'D'].map((size, i) => `
         @media ${ device[size] } {
              width : 100%;
            width : calc(100% / 3);
         }`)
    };
    ${ props =>  ['M'].map((size, i) => `
         @media ${ device[size] } {
            width : 100%;
         }`)
    };
    
`

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


export const TextHeading = styled(TextCommon)`
    ${  ['T', 'D'].map((size, i) => `
         @media ${ device[size] } {
           text-shadow: 0px 0px 6px rgb(0,0,0,60%);
         }`)
    };
`;