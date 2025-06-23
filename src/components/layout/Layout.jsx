import React from 'react';
import { ThemeProvider } from 'styled-components';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import GlobalStyles from '../../styles/GlobalStyles.jsx';
import theme from '../../styles/theme.jsx';

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
