import styled from 'styled-components';
import {ContainerCommon} from '../../styles/common.styled';
import {ImageContainerCommon} from "../../styles/common.styled";

export const Container = styled(ContainerCommon).attrs(props => ({
    disabledLink : props.disabledLink,
}))`
    cursor : ${props => props.disabledLink ? 'auto' : 'pointer'};
    overflow : visible;
    flex-direction : column;
    
    & ${ImageContainerCommon}{
        transition : transform 0.25s 0s cubic-bezier(0.32, 0.01, 0, 1);
         transform : scale(1, 1);
    }   
    &:hover ${ImageContainerCommon}{
        transform : scale(1.05, 1.05);
    }
`;
