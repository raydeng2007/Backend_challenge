import styled from 'styled-components';
import { Flex } from 'rebass';

export const Container = styled.div`
    width: 300px;
    height: 300px;
    border: 2px solid black;
    cursor: pointer;
    margin-right: 20px;
    margin-bottom: 20px;
`;

export const ImageContainer = styled.div`
    width: 300px;
    height: 250px;
    border-bottom: 2px solid black;
`;

export const ImageStyles = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
`;

export const NameContainer = styled(Flex)`
    height: 50px;
    width: 300px;
    align-items: center;
    justify-content: center;
`;
