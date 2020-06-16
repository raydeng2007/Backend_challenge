import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';

import * as Styled from './styles';

const TestSelect = ({ history }) => (
  <Styled.Container>
    <Flex mr={3}>
      <Styled.StyledButton
        onClick={() => history.push('/front-end-classic')}
      >
        Front-End Classic Test
      </Styled.StyledButton>
    </Flex>
    <Flex mr={3}>
      <Styled.StyledButton
        onClick={() => history.push('/front-end-hooks')}
      >
        Front-End Hooks Test
      </Styled.StyledButton>
    </Flex>
    <Flex mr={3}>
      <Styled.StyledButton
        onClick={() => history.push('/back-end')}
      >
        Back-End Test
      </Styled.StyledButton>
    </Flex>
  </Styled.Container>
);

TestSelect.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TestSelect;
