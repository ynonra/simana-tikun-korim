import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLang } from '../../redux/tikun/tikun.selectors';

import TikunSeferPage from '../TikunSeferPage/TikunSeferPage.component';
import CustomAnimatedSwitch from '../../components/CustomAnimatedSwitch/CustomAnimatedSwitch.component';
import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';
import NavButtonsContainer from '../../components/NavButtonsContainer/NavButtonsContainer.component';

import { tikunHumashPageText } from '../../data/lang-dic';
import './TikunHumashPage.styles.scss';

const TikunHumashPage = ({ lang }) => {
  const match = useRouteMatch();

  return (
    <CustomAnimatedSwitch>
      <Route exact path={match.path}>
        <div className="humash-page page default-background">
          <AppBar title={tikunHumashPageText.appBarTitle[lang]} />
          <NavButtonsContainer
            className="display-flex"
            buttonsData={[
              {
                title: tikunHumashPageText.bereshit[lang],
                url: tikunHumashPageText.bereshit.en,
              },
              {
                title: tikunHumashPageText.shemot[lang],
                url: tikunHumashPageText.shemot.en,
              },
              {
                title: tikunHumashPageText.vayikra[lang],
                url: tikunHumashPageText.bereshit.en,
              },
              {
                title: tikunHumashPageText.bamidbar[lang],
                url: tikunHumashPageText.bamidbar.en,
              },
              {
                title: tikunHumashPageText.devarim[lang],
                url: tikunHumashPageText.devarim.en,
              },
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

const mapStateToProps = createStructuredSelector({
  lang: selectLang,
});

export default connect(mapStateToProps)(TikunHumashPage);
