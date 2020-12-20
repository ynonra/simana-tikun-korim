import React from 'react';
import { useRouteMatch, Route } from 'react-router-dom';

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

const TikunSeferPage = () => {
  const match = useRouteMatch();
  const { sefer } = match.params;

  return (
    // <div className="tikun-sefer-page">
    <CustomAnimatedSwitch>
      <Route exact path={match.path}>
        {/* <BookIcon /> */}
        <div className="sefer-page page default-background">
          <AppBar title={'ספר ' + parashotDic[sefer][0]} />
          <NavButtonsContainer
            buttonsData={parashotDic[sefer].map((hebParasha) => {
              return {
                title: hebParasha,
                url: parashotHebEnDic[hebParasha],
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

export default TikunSeferPage;
