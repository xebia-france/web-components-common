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
                        
                        ${ props.hadChildren ? `
                            &:after{
                                ${ props.basisSubLink ?
                                ( props.basisSubLink[size].color ? `border-bottom : 20px solid ${ getFormatedColor(props.basisSubLink[size].color, props.basisSubLink[size].opacity ) }; ` : '' )
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
                padding-bottom : 40px;
                
                &:after{
                    position : absolute;
                    content : '';
                    width : 0px;
                    height : 40px;
                    left : 40px;
                    bottom : 0px;
                    border-right : 20px solid transparent;
                    border-left : 20px solid transparent;
                    border-top : none;
                    display : block;
                }
            
            ` : ''}
        }
        
        & ${ArrowContainer}{
            transform : rotate(0deg);
        }
        
        & ${LinksChildren}{
            display : block;
        }
        
        
    
    }
    
    @media  ${ device.T }, ${ device.D }{
        &.open{
            &>${Link}{
                ${ props => props.hadChildren ? `
                    padding-bottom : 0px;
                    
                    &:after{
                        bottom : -1px;
                    }
                
                ` : ''}
            }
            & ${LinksChildren}{
                display : flex;
                flex-direction : column;
                justify-content : center;
            }
            
            
        
        }
    }
    
    
`;