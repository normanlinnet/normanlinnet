import React from 'react';
import styled from 'react-emotion';

import { unit, colors } from '../styles';

interface HeaderProps {
  image?: string | any;
  children?: any;
}

const Header: React.FC<HeaderProps> = ({
  children = 'Vocab Explorer',
}) => {
  const email = atob(localStorage.getItem('token') as string);

  return (
    <Container>
      <div>
        <h2>{children}</h2>
        <Subheading>{email}</Subheading>
      </div>
    </Container>
  );
}

export default Header;

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: unit * 4.5,
  paddingLeft: 11+16,
  paddingTop: 15,
});

const Subheading = styled('h5')({
  marginTop: unit / 2,
  color: colors.textSecondary,
});
