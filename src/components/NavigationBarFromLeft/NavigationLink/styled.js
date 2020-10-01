import styled from "styled-components";
import {ArrowContainer, LinksChildren, Link} from "../styled";
import { getFormatedColor} from "../../../utils/StyleGenerator";
import { device} from "../../../styles/constants";

export const Element = styled.li.attrs(props => ({
    responsive: props.responsive,
    basis: props.basis,
    hadChildren : props.hadChildren,
    basisSubLink : props.basisSubLink
}))`
    @media  ${ device.M }{
        position : relative;
    }
    
    ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
                background-color: ${ getFormatedColor(props.basis[size].color, props.basis[size].opacity) };
                ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background:${ props.basis[size].color.gradient  };
               ` : ''}
               
               &.open{
                    &>${Link}{
                       &>span{
                           border-bottom-width:3px;
                           border-bottom-style:solid;
                       }
                        ${ props.hadChildren ? `
                            &:after{
                                ${ props.basisSubLink ?
    ( props.basisSubLink[size].color ? `border-right : 24px solid ${ getFormatedColor(props.basisSubLink[size].color, props.basisSubLink[size].opacity ) }; ` : '' )
    : ''}
                            }
                        
                        ` : ''}
                    }
                }
         }`)
    };
    &.open{
        &>${Link}{
            position : relative;
            ${ props => props.hadChildren ? `
                //padding-bottom : 40px;
                
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
                }
            
            ` : ''}
        }
        
        & ${ArrowContainer}{
            //transform : rotate(180deg);
            opacity: 0;
        }
        
        & ${LinksChildren}{
            display : block;
            
        }
        
        
    
    }
    
    @media  ${ device.T }, ${ device.D }{
        &.open{
            &>${Link}{
            
            
                ${ props => props.hadChildren ? `
                    //padding-bottom : 0px;
                    
                    &:after{
                       // bottom : -1px;
                    }
                
                ` : ''}
            }
            & ${LinksChildren}{
                display : flex;
                flex-direction : column;
                transform : translateX(0%);
            }
            
            
        
        }
    }
    
    
`;