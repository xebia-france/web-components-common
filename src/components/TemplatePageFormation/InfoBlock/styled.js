import styled from "styled-components";
import {device} from "../../../styles/constants";
import {generateTextColor} from "../../../utils/StyleGenerator";
import {Content} from "../styled";

export const ContentBlock = styled(Content).attrs(props => ({
    responsive: props.responsive,
    typography: props.typography

}))`
  z-index : 2;

${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            & strong, & a{
              ${props.typography ? generateTextColor(props.typography, size) : ''}
            }
         }`)
    };
`;