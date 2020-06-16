import styled from 'styled-components';
import { Flex } from 'rebass';
import Button from '@material-ui/core/Button';

export const StyledButton = styled(Button)`
    && {
        background-color: blue;
        color: white;
    }
`;

export const ModalContainer = styled(Flex)`
    flex-direction: column;
    width: 500px;
    background-color: white;
    padding: 20px;
`;
