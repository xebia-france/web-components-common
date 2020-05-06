import styled from "styled-components";
import {device} from "../../../styles/constants";
import { getFormatedColor} from "../../../utils/StyleGenerator";
import {Content} from "../styled";

export const ContentBlock = styled(Content).attrs(props => ({
    responsive: props.responsive,
    typography: props.typography

}))`
  z-index : 2;

${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            & strong, & a{
              color:${ getFormatedColor(props.typography[size].color, props.typography[size].opacity) };
            }
         }`)
    };
`;