import styled from "styled-components";
import {device} from "../../../styles/constants";
import { getFormatedColor} from "../../../utils/StyleGenerator";
import {ContainerCommon, TextCommon} from "../../../styles/common.styled";


export const ContainerPromo = styled(ContainerCommon)`
    flex-direction : row;
`;

export const Contain = styled.div`
    width : 100%;
    display : flex;
    flex-direction : column;
    justify-content : center;
    
    ${TextCommon}{
        display : flex;
        justify-content : space-between;
   
    }
`;
export const IconContainer = styled.div.attrs(props => ({
    responsive: props.responsive,
    typography: props.typography
}))`
    width: 40px;
    height: 40px;
    z-index : 2;
    
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


export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis
}))`
    display : flex;
    padding-bottom : 5px;
    
    ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            ${ props.basis ? `border-bottom: 2px solid ${ getFormatedColor(props.basis[size].color, props.basis[size].opacity) };` : '' }       
            
         }`)
    };
    
`;