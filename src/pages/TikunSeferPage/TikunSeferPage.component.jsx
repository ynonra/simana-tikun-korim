import React from 'react';
import { useRouteMatch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLang } from '../../redux/tikun/tikun.selectors';

import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';
import CustomAnimatedSwitch from '../../components/CustomAnimatedSwitch/CustomAnimatedSwitch.component';
import NavButtonsContainer from '../../components/NavButtonsContainer/NavButtonsContainer.component';
import TikunReadingPage from '../TikunReadingPage/TikunReadingPage.component';
// import BookIcon from '../../components/BookIcon/BookIcon.component';

import parashotDic, {
  parashotHebEnDic,
} from '../../data/parashot-by-books-dic';

import './TikunSeferPage.styles.scss';
const TikunSeferPage = ({ lang }) => {
  const match = useRouteMatch();
  const { sefer } = match.params;

  return (
    // <div className="tikun-sefer-page">
    <CustomAnimatedSwitch>
      <Route exact path={match.path}>
        {/* <BookIcon /> */}
        <div className="sefer-page page default-background">
          <AppBar
            title={
              lang === 'he'
                ? `ספר ${parashotDic[sefer][0]}`
                : `Chumash ${sefer}`
            }
          />
          <NavButtonsContainer
            buttonsData={parashotDic[sefer].map((hebParasha) => {
              const enParasha = parashotHebEnDic[hebParasha];
              return {
                title: lang === 'he' ? hebParasha : enParasha,
                url: enParasha,
              };
            })}
          />
          <Footer />
        </div>
      </Route>
      <Route path={`${match.path}/:parashaName`}>
        <TikunReadingPage />
      </Route>
    </CustomAnimatedSwitch>
    // </div>
  );
};

const mapStateToProps = createStructuredSelector({
  lang: selectLang,
});

export default connect(mapStateToProps)(TikunSeferPage);
