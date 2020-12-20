import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import TikunSeferPage from '../TikunSeferPage/TikunSeferPage.component';
import CustomAnimatedSwitch from '../../components/CustomAnimatedSwitch/CustomAnimatedSwitch.component';
import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';
import NavButtonsContainer from '../../components/NavButtonsContainer/NavButtonsContainer.component';
import './TikunHumashPage.styles.scss';

const TikunHumashPage = () => {
  const match = useRouteMatch();

  return (
    <CustomAnimatedSwitch>
      <Route exact path={match.path}>
        <div className="humash-page page default-background">
          <AppBar title="חומש" />
          <NavButtonsContainer
            className="display-flex"
            buttonsData={[
              { title: 'בראשית', url: 'Bereshit' },
              { title: 'שמות', url: 'Shemot' },
              { title: 'ויקרא', url: 'Vayikra' },
              { title: 'במדבר', url: 'Bamidbar' },
              { title: 'דברים', url: 'Devarim' },
            ]}
          />
          <Footer />
        </div>
      </Route>
      <Route path={`${match.path}/:sefer`}>
        <TikunSeferPage />
      </Route>
    </CustomAnimatedSwitch>
  );
};

export default TikunHumashPage;
