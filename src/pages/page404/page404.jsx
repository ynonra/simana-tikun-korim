import React from 'react';

import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';

const Page404 = () => {
  return (
    <div className="about-page page default-background">
      <AppBar title="404" />
      <h1 style={{ margin: 'auto' }}>הדף לא נמצא</h1>
      <Footer />
    </div>
  );
};

export default Page404;
