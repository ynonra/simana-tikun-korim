import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLang } from '../../redux/tikun/tikun.selectors';

import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';

import { aboutPageText } from '../../data/lang-dic';
import './AboutPage.scss';

const AboutPage = ({ lang }) => {
  return (
    <div className="about-page page default-background">
      <AppBar title={aboutPageText.appBarTitle[lang]} />
      <section className="content">
        <div className="paragraph">
          <h2>{aboutPageText.overallSection.title[lang]}</h2>
          <div
            className="description"
            dangerouslySetInnerHTML={
              aboutPageText.overallSection.paragraphHtml[lang]
            }
          />
        </div>
        <div className="paragraph">
          <h2>{aboutPageText.motivationSection.title[lang]}</h2>
          <div
            className="description"
            dangerouslySetInnerHTML={
              aboutPageText.motivationSection.paragraphHtml[lang]
            }
          />
        </div>
        <div className="paragraph">
          <h2>{aboutPageText.benefitsSection.title[lang]}</h2>
          <div
            className="description"
            dangerouslySetInnerHTML={
              aboutPageText.benefitsSection.paragraphHtml[lang]
            }
          />
        </div>
        <div className="paragraph">
          <h2>{aboutPageText.notesSection.title[lang]}</h2>
          <div
            className="description"
            dangerouslySetInnerHTML={
              aboutPageText.notesSection.paragraphHtml[lang]
            }
          />
        </div>
        <div className="paragraph">
          <h2 id="donate-title">{aboutPageText.donateSection.title[lang]}</h2>
          <div
            className="description"
            dangerouslySetInnerHTML={
              aboutPageText.donateSection.paragraphHtml[lang]
            }
          />
        </div>
        <div className="paragraph">
          <h2>{aboutPageText.thanksSection.title[lang]}</h2>
          <div
            className="description"
            dangerouslySetInnerHTML={
              aboutPageText.thanksSection.paragraphHtml[lang]
            }
          />
        </div>
        <div className="paragraph">
          <h2>{aboutPageText.creditsSection.title[lang]}</h2>
          <div
            className="description"
            dangerouslySetInnerHTML={
              aboutPageText.creditsSection.paragraphHtml[lang]
            }
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  lang: selectLang,
});

export default connect(mapStateToProps)(AboutPage);
