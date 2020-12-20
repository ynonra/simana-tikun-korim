import React from 'react';

import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';

import './AboutPage.scss';

const AboutPage = () => {
  return (
    <div className="about-page page default-background">
      <AppBar title="אודות" />
      <section className="content">
        <div className="paragraph">
          <h2>באופן כללי</h2>
          <div className="description">
            האתר-יישומון <b>סימנא</b> נבנה ע"י{' '}
            <a href="mailto:ynonra@gmail.com">ינון רחמים</a> ועוצב ע"י{' '}
            <a
              href="https://louck.co.il"
              target="_blank"
              rel="noopener noreferrer"
            >
              אריאל לוק
            </a>
            . היישומון מציע דרך קלה ונוחה ללמוד טעמי מקרא והפטרה, וכמו כן ללמוד
            את קריאות התורה השונות של מהלך השנה. כל הזכויות שמורות ליוצרים.
          </div>
        </div>
        <div className="paragraph">
          <h2>הניעה (מוטיבציה)</h2>
          <div className="description">
            בתור קורא בתורה לעיתים, נוכחתי לדעת שאין דרך מספיק קלה ונוחה
            (ומהנה!) ללימוד טעמי המקרא וללימוד קריאת התורה, יחסית לאפשרויות
            הרבות שהטכנולוגיה בזמננו מציעה. ובודאי דבר זה מעכב מרבים וטובים
            להיכנס ללימוד הזה.
          </div>
        </div>
        <div className="paragraph">
          <h2>יתרונות ושדרוגים</h2>
          <div className="description">
            להלן שלושת הנושאים המרכזיים ששופרו ביישומון שבידכם:
            <ul>
              <li>
                <b>צורת הדף</b> של החומש זהה לצורת הדף של רוב ככל ספרי התורה
              </li>
              <li>
                פותחה מערכת חכמה ומשוכללת לצורך <b>לימוד טעמי מקרא</b>
              </li>
              <li>
                <b>עיצוב חדשני ונקי!</b>
              </li>
              <li>ואת כל השאר נשאיר לכם לגלות לבד...</li>
            </ul>
          </div>
        </div>
        <div className="paragraph">
          <h2>כמה הערות</h2>
          <div className="description">
            הכיתוב של החומש הנו על-פי מסורת אשכנז, וישנם שינויים ספורים בין
            המסורות השונות בעם ישראל. בנוסף, יתכנו טעויות ספורות בכיתוב
          </div>
        </div>
        <div className="paragraph">
          <h2 id="donate-title">קחו גם חלק!</h2>
          <div className="description">
            הננו קוראים לכם, קוראים נכבדים, להצטרף לפעילות לזיכוי הרבים בכלל עם
            ישראל. צרו עימנו קשר לתרומה{' '}
            <a href="mailto:ynonra@gmail.com">במייל</a> או{' '}
            <a href="tel:+972586741194">בפלאפון</a>, על מנת שנוכל להמשיך בפעילות
            ולפתח עוד את היישומון בזכותכם. (יש אפשרות להקדשה)
          </div>
        </div>
        <div className="paragraph">
          <h2>תודות</h2>
          <div className="description">
            <ul>
              <li>לאריאל לוק המעצב המוכשר</li>
              <li>
                לרב גד כהן ולרב עידן עזר שהתנדבו מזמנם להקליט את טעמי המקרא
              </li>
              <li>
                לנערים היקרים שמואל ומאיר מכלוף הי"ו שסייעו בהזנת צורת הדף
              </li>
              <li>
                ואת עלית על כולנה לאשתי היקרה שהסכימה לסבול אותי כל החודשים האלה
              </li>
            </ul>
          </div>
        </div>
        <div className="paragraph">
          <h2>מזכים (קרדיטים)</h2>
          <div className="description">
            <ul>
              <li>
                אלמנטים ואיקונים -{' '}
                <a
                  className="font-for-en"
                  href="https://material-ui.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  material-ui
                </a>
              </li>
              <li>
                הגופן של כיתוב המקרא -{' '}
                <span className="font-for-en">Taamey Frank CLM</span> (יוצר -
                יורם גרנט), רישיון -{' '}
                <a
                  className="font-for-en"
                  href="https://en.wikipedia.org/wiki/GPL_font_exception"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GPL+FE
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
