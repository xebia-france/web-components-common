import styled from "styled-components";
import {device} from "../../../styles/constants";

export const Container = styled.div`
    width : 100%;
    display : flex;
    
    &>*{
        z-index : 2;
    }
    
    @media  ${ device.M }{
        flex-direction : column;
       // align-items : center;
    }
`;
export const Left = styled.div`
    display : flex;
    flex-direction : column;
`;
export const Right = styled.div`
    
`;
