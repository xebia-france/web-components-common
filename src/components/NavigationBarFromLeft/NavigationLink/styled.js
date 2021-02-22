import styled from "styled-components";
import {ArrowContainer, LinksChildren, Link} from "../styled";
import {generateBackground, getFormatedColor} from "../../../utils/StyleGenerator";
import { device} from "../../../styles/constants";

export const Element = styled.li.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    hadChildren : props.hadChildren,
    basisSubLink : props.basisSubLink,
    basisLink : props.basisLink
}))`
    display : flex;
    align-items: center;

    
    ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
                ${props.basis ? generateBackground(props.basis, size) : ''}
                ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background:${ props.basis[size].color.gradient  };
               ` : ''}
               
               &:not(.open){
                    
                    &>${Link}{
                       &>span{
                            border-color : transparent;
                       }
                    }   
               }
               &.open{
                    &>${Link}{
                       position : relative;
                       &>span{
                           
                       }
                        ${ props.hadChildren ? `
                            &:after{
                                ${ props.basisSubLink ? ( props.basisSubLink[size].color ? 
                                `border-right : 24px solid ${ getFormatedColor(props.basisSubLink[size].color, props.basisSubLink[size].opacity ) }; ` : '' ) : ''}
                            }
                        ` : ''}
                    }
                    
                    & ${ArrowContainer}{
                        opacity: 0;
                    }
                    
                    & ${LinksChildren}{
                        display : block;
                        z-index : 10;
                    }
                }
         }`)
    };
    
    ${ props => ['T', 'D'].map((size, i) => `
         @media ${ device[size] } {
               &.open{
                    & ${LinksChildren}{
                        display : flex;
                        flex-direction : column;
                        transform : translateX(0%);
                    }
                    &>${Link}{
                        ${ props.hadChildren ? `
                            &:after{
                                position : absolute;
                                content : '';
                                width : 48px;
                                height : 0px;
                                top : 0;
                                right : 0;
                                border-bottom : 24px solid transparent;
                                border-left : none;
                                border-top : 24px solid transparent;
                                display : block;
                                ${ props.basisSubLink ?
                                    ( props.basisSubLink[size].color ? `border-right : 24px solid ${ getFormatedColor(props.basisSubLink[size].color, props.basisSubLink[size].opacity ) }; ` : '' )
                                    : ''}
                                    
                            }
                        ` : ''}
                    }
                }
         }`)
    };
    
    @media  ${ device.M }{
        position : relative;
        flex-direction:  column;
        
        &.open{
            &>${Link}{
                ${ props => props.hadChildren ? `
                    &:after{
                        position : absolute;
                        content : '';
                        width : 0px;
                        height : 48px;
                        bottom :  -24px;
                        left : 48px;
                        border-right : 24px solid transparent;
                        border-left : 24px solid transparent;
                        display : block;
                        
                        ${ props.basisSubLink ? ( props.basisSubLink['M'].color ? `border-bottom : 24px solid ${ getFormatedColor(props.basisSubLink['M'].color, props.basisSubLink['M'].opacity ) }; ` : '' ) : ''}
                    }
                ` : ''}
            }
            & ${LinksChildren}{
                margin-top : 24px !important;
             }
        }
    }
    
    
`;