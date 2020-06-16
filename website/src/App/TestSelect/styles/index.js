import styled from 'styled-components';
import { Flex } from 'rebass';
import Button from '@material-ui/core/Button';

export const Container = styled(Flex)`
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

export const StyledButton = styled(Button)`
    && {
        background-color: blue;
        color: white;
    }
`;
