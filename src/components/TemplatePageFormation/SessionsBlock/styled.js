import styled from "styled-components";
import {device} from "../../../styles/constants";
import { getFormatedColor} from "../../../utils/StyleGenerator";
import {ContainerCommon, TextCommon} from "../../../styles/common.styled";


export const Container = styled.div`
    display : flex;
    flex-direction : column;
    width : 100%;
`;



export const ListSession = styled.div.attrs(props => ({

}))`
   &>div:last-child{
    border : none;
   }
`;

