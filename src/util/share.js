import { sharingText } from '../data/lang-dic';

export async function shareHandler(fallBackFunc, lang) {
  const shareData = {
    title: sharingText.shortTitle[lang],
    text: sharingText.longTitle[lang],
    url:
      'https://play.google.com/store/apps/details?id=il.co.tikunkorim.www.twa',
  };
  if (navigator.share) {
    await navigator.share(shareData);
  } else {
    fallBackFunc();
  }
}
