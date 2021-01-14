import {
  marokaiHumash as teamimSfaradiData,
  ashkenaziHumash as teamimAshkenaziData,
} from '../data/teamim-dic';

export function findTaamInWord(currentWord, prevWords, nextWords) {
  let taamData = undefined;
  const teamimArr = parseTeamimArrFromWord(currentWord);
  if (!teamimArr) return;

  if (teamimArr.includes('֨')) {
    const azlaGerishData = azlaGerishHandler(teamimArr, prevWords, nextWords);
    if (azlaGerishData) {
      return azlaGerishData;
    }
    const treyKadminData = treyKadmimHandler(teamimArr);
    if (treyKadminData) {
      return treyKadminData;
    }

    if (teamimArr.length > 1) {
      return getSecondTaamData(teamimArr, '֨');
    } else if (!nextWords || nextWords.length < 1) {
      return;
    } else return getKadmaData();
  } else if (teamimArr.includes('֜')) {
    return (
      azlaGerishHandler(teamimArr, prevWords, nextWords) || getAzlaGereshData()
    );
  } else if (teamimArr.includes('֖')) {
    // טרחא
    const isContinuationFound = findTarhaContinuation(
      teamimArr,
      nextWords,
      prevWords
    );
    const { continuationTaam, sfaradiSentenceRange, ashkenaziSentenceRange } =
      isContinuationFound || {};
    // console.log(isContinuationFound);
    taamData = {
      ...findTaamData({
        queryLang: 'he',
        sfaradiQuery: continuationTaam || null,
        ashkenaziQuery: '֖',
      }),
      sfaradiSentenceRange,
      ashkenaziSentenceRange,
    };
  } else if (teamimArr.includes('֥')) {
    // מאריך
    const isContinuationFound = findTarhaContinuation(
      teamimArr,
      nextWords,
      prevWords
    );
    if (!isContinuationFound) return;
    const {
      continuationTaam,
      sfaradiSentenceRange,
      ashkenaziSentenceRange,
    } = isContinuationFound;
    // console.log(isContinuationFound);
    taamData = {
      ...findTaamData({
        queryLang: 'he',
        sfaradiQuery: continuationTaam,
        ashkenaziQuery: '֖',
      }),
      sfaradiSentenceRange,
      ashkenaziSentenceRange,
    };
  } else if (teamimArr.includes('֣')) {
    // שופר הולך
    if (checkIfPasek(teamimArr, nextWords)) {
      const { nextTaamWordsCount } = checkIfPasek(teamimArr, nextWords);
      taamData = {
        ...findTaamData({
          queryLang: 'en',
          sfaradiQuery: 'pasek',
          ashkenaziQuery: 'pesik',
        }),
        nextTaamWordsCount,
      };
    } else if (teamimArr.length > 1) {
      return getSecondTaamData(teamimArr, '֣');
    } else return;
  } else if (checkIfTelisha(teamimArr)) {
    return getTelishaData();
  } else if (teamimArr.includes('֟')) {
    return getKarneyParaData();
  } else if (findSofPasukAndAtnahStringHandler(teamimArr, prevWords)) {
    const { prevTaamWordsCount, taamStr } = findSofPasukAndAtnahStringHandler(
      teamimArr,
      prevWords
    );
    taamData = {
      ...findTaamData({
        queryLang: 'he',
        sfaradiQuery: taamStr,
        ashkenaziQuery: taamStr,
      }),
      sfaradiSentenceRange: {
        prevTaamWordsCount,
      },
      ashkenaziSentenceRange: {},
    };
  } else if (checkIfZarkaSegolta(teamimArr)) {
    return zarkaSegolataHandler(teamimArr, prevWords, nextWords);
  } else if (findShofarMehupahHandler(teamimArr, nextWords)) {
    taamData = findShofarMehupahHandler(teamimArr, nextWords);
  } else {
    // לאחר שנשללה כל אפשרות של 2 טעמים במילה וגם טעמים מיוחדים
    return getFirstTaamData(teamimArr);
  }
  // console.log(taamData);
  return taamData;
}

function azlaGerishHandler(teamimArr, prevWords, nextWords) {
  const isAzla = teamimArr.includes('֨');
  const oppositeTaam = isAzla ? '֜' : '֨';
  const siblingWords = isAzla ? nextWords : prevWords;

  const twoSiblingWordsTeamimArr = [
    parseTeamimArrFromWord(siblingWords[0]),
    parseTeamimArrFromWord(siblingWords[1]),
  ];
  const azlaGerishData = findTaamData({
    queryLang: 'en',
    sfaradiQuery: 'azla-gerish',
    ashkenaziQuery: 'kadma-veazla',
  });
  const allWordsTeamim = [teamimArr, ...twoSiblingWordsTeamimArr];
  for (let i = 0; i < allWordsTeamim.length; i++) {
    const wordTeamim = allWordsTeamim[i];
    if (!wordTeamim) continue;
    if (wordTeamim.includes(oppositeTaam)) {
      const sentenceRange = {
        nextTaamWordsCount: isAzla ? i : 0,
        prevTaamWordsCount: !isAzla ? i : 0,
      };
      return {
        ...azlaGerishData,
        sfaradiSentenceRange: sentenceRange,
        ashkenaziSentenceRange: sentenceRange,
      };
    }
  }
}

function treyKadmimHandler(teamimArr) {
  // console.log(teamimArr.includes('֙'));
  if (teamimArr.includes('֙'))
    return findTaamData({
      queryLang: 'en',
      sfaradiQuery: 'trey-kadmin',
      ashkenaziQuery: 'pashata',
    });
}

function findShofarMehupahHandler(teamimArr, nextWords) {
  if (!teamimArr.includes('֤')) return;
  const nextWordsCountUntilPashta =
    nextWords && nextWords.findIndex((word) => word.includes('֙')) + 1;
  const taamData = {
    ...findTaamData({
      queryLang: 'he',
      sfaradiQuery: '֤',
      ashkenaziQuery: '֤',
    }),
    sfaradiSentenceRange: {},
    ashkenaziSentenceRange: { nextTaamWordsCount: nextWordsCountUntilPashta },
  };
  return taamData;
}

function findSofPasukAndAtnahStringHandler(teamimArr, prevWords) {
  const taamStr = teamimArr.includes('֑')
    ? '֑'
    : teamimArr.includes('׃')
    ? '׃'
    : null;
  if (!taamStr) return;

  const allWordsTeamimArr = [...teamimArr, ...mapWordsToTeamim(prevWords)];
  const prevTaamWordsCount = countRegularTeamimInWord(allWordsTeamimArr);
  // console.log(prevTaamWordsCount);
  return { prevTaamWordsCount, taamStr };
}

function zarkaSegolataHandler(teamimArr, prevWords, nextWords) {
  let taamData, prevTaamWordsCount, nextTaamWordsCount;
  if (teamimArr.includes('֒')) {
    // סגולתא
    taamData = getSegoltaData();
    prevTaamWordsCount = countWordsUntilTaam('֮', prevWords);
  } else {
    // זרקא
    taamData = getZarkaData();
    nextTaamWordsCount = countWordsUntilTaam('֒', nextWords);
  }
  return {
    ...taamData,
    sfaradiSentenceRange: {
      prevTaamWordsCount,
      nextTaamWordsCount,
    },
    ashkenaziSentenceRange: {},
  };
}

function getKadmaData() {
  return findTaamData({
    queryLang: 'en',
    sfaradiQuery: 'kadma',
    ashkenaziQuery: null,
  });
}

function getAzlaGereshData() {
  return findTaamData({
    queryLang: 'en',
    sfaradiQuery: 'azla-gerish',
    ashkenaziQuery: 'azla-geresh',
  });
}

function getSecondTaamData(teamimArr, firstTaamStr) {
  const secondTaamStr = teamimArr.find((taamStr) => taamStr !== firstTaamStr);
  const secondTaamData = findTaamData({
    queryLang: 'he',
    sfaradiQuery: secondTaamStr,
    ashkenaziQuery: secondTaamStr,
  });
  return secondTaamData;
}

function getTelishaData() {
  return findTaamData({
    queryLang: 'en',
    sfaradiQuery: 'talsha',
    ashkenaziQuery: 'telish-ketana',
  });
}

function getZarkaData() {
  return findTaamData({
    queryLang: 'he',
    sfaradiQuery: '֮',
    ashkenaziQuery: '֮',
  });
}

function getSegoltaData() {
  return findTaamData({
    queryLang: 'he',
    sfaradiQuery: '֒',
    ashkenaziQuery: '֒',
  });
}

function getKarneyParaData() {
  return findTaamData({
    queryLang: 'en',
    sfaradiQuery: 'pazer-gadol',
    ashkenaziQuery: 'karney-para',
  });
}

function checkIfZarkaSegolta(teamimArr) {
  return (
    teamimArr.includes('֘') ||
    teamimArr.includes('֮') ||
    teamimArr.includes('֒')
  );
}

function checkIfTelisha(teamimArr) {
  return teamimArr && (teamimArr.includes('֠') || teamimArr.includes('֩'));
}

function checkIfPasek(teamimArr, nextWords) {
  if (teamimArr.includes('׀')) {
    return { nextTaamWordsCount: 0 };
  } else if (nextWords && nextWords[0] === '׀') {
    return { nextTaamWordsCount: 1 };
  }
}

function findTarhaContinuation(teamimArr, nextWords, prevWords) {
  const nextWordsTeamimArr = [teamimArr, ...mapWordsToTeamim(nextWords)];
  const prevWordsTeamimArr = [null, ...mapWordsToTeamim(prevWords)];
  const prevTaamWordsCount = countRegularTeamimInWord(prevWordsTeamimArr);
  // console.log(prevTaamWordsCount);
  let nextWordsUntilTarha;
  for (let i = 0; i < nextWordsTeamimArr.length; i++) {
    const wordTeamimArr = nextWordsTeamimArr[i];
    if (!wordTeamimArr) continue;
    if (wordTeamimArr.includes('֖')) nextWordsUntilTarha = i;
    if (wordTeamimArr.includes('֑')) {
      return {
        continuationTaam: '֑',
        sfaradiSentenceRange: {
          nextTaamWordsCount: i,
          prevTaamWordsCount,
        },
        ashkenaziSentenceRange: {
          prevTaamWordsCount,
          nextTaamWordsCount: nextWordsUntilTarha,
        },
      };
    } else if (wordTeamimArr.includes('׃')) {
      return {
        continuationTaam: '׃',
        sfaradiSentenceRange: {
          nextTaamWordsCount: i,
          prevTaamWordsCount,
        },
        ashkenaziSentenceRange: {
          prevTaamWordsCount,
          nextTaamWordsCount: nextWordsUntilTarha,
        },
      };
    } else if (checkIncludesNotRegularTeamim(wordTeamimArr)) return;
  }
}

function getFirstTaamData(teamimArr) {
  return findTaamData({
    queryLang: 'he',
    sfaradiQuery: teamimArr[0],
    ashkenaziQuery: teamimArr[0],
  });
}

function countRegularTeamimInWord(wordsTeamimArr) {
  for (let i = 1; i < wordsTeamimArr.length; i++) {
    const teamimInWord = wordsTeamimArr[i];
    if (checkIncludesNotRegularTeamim(teamimInWord)) return i > 0 ? i - 1 : 0;
  }
  return wordsTeamimArr.length;
}

function countWordsUntilTaam(taamStr, siblingWords) {
  const teamimInWordsArr = mapWordsToTeamim(siblingWords);
  // console.log(taamStr);
  for (let i = 0; i < teamimInWordsArr.length; i++) {
    const teamimInWord = teamimInWordsArr[i];
    if (!teamimInWord) continue;
    if (teamimInWord.includes(taamStr)) return i + 1;
  }
  return null;
}

function findTaamData({ queryLang, sfaradiQuery, ashkenaziQuery }) {
  return {
    sfaradi: teamimSfaradiData.find(
      findTaamDataInSpecificReadingType(queryLang, sfaradiQuery)
    ),
    ashkenazi: teamimAshkenaziData.find(
      findTaamDataInSpecificReadingType(queryLang, ashkenaziQuery)
    ),
  };
}

function findTaamDataInSpecificReadingType(queryLang, query) {
  return (taamData) =>
    taamData.forTeamimParser !== false && queryLang === 'he'
      ? taamData[queryLang] && taamData[queryLang].match(query)
      : taamData[queryLang] === query;
}

function mapWordsToTeamim(wordsArr) {
  return wordsArr.map((word) => parseTeamimArrFromWord(word));
}

function checkIncludesNotRegularTeamim(teamimArr) {
  return (
    teamimArr &&
    !teamimArr.includes('֥') &&
    !teamimArr.includes('֭') &&
    !teamimArr.includes('֖') &&
    !teamimArr.includes('֣')
  );
}

function parseTeamimArrFromWord(word) {
  // return word.match(/[^בגדהוזחטיכלמנסעפצקרשתםןץףך ְֱֲֳִֵֶַָֹֺֻּֽׁׂׅׄ־א]/g, '');
  return word && word.match(/[֑֖֛֢֣֤֦֧֪֥֚֭֮֒֓֔֕֗֘֙֜֝֞֟֠֡֨֩׃]/g, ''); //בלי מאריך, שופר-הולך, געיא, וכל הטעמים הנדירים
}
