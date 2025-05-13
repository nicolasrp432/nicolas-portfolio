import React from 'react';
import { ThemeProvider } from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import GlobalStyles from '../../styles/GlobalStyles';
import theme from '../../styles/theme';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default Layout;
