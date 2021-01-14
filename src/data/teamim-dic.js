export const marokaiHumash = [
  {
    he: 'זַרְקָא֮ מַקַּףְ־שׁוֹפָר הוֹלֵ֣ךְ סֶגוֹלְתָא֒',
    en: 'zarka-makaf-shofar-holeh-segolata',
  },
  { he: 'פָּזֵר-גָּד֡וֹל', en: 'pazer-gadol' },
  { he: 'גַּעְיָֽא' },
  { he: 'תַ֠לְשָׁא', en: 'talsha' },
  { he: 'אַזְלָ֨א-גֵּרִ֜ישׁ', en: 'azla-gerish' },
  { he: 'פָּסֵ֣ק׀', en: 'pasek' },
  { he: 'רָבִ֗יעַ', en: 'ravia' },
  { he: 'קַדְמָ֨א', en: 'kadma' },
  { he: 'שׁוֹפָר מְהֻפָּ֤ךְ', en: 'shofar-mehupah' },
  { he: 'פַּשְטָא֙', en: 'pashta' },
  { he: 'תְּרֵי־קַ֨דְמִין֙', en: 'trey-kadmin' },
  { he: 'זָקֵ֣ף־קָטֹ֔ן', en: 'zakef-katon' },
  { he: 'זָקֵ֣ף־גָּד֕וֹל', en: 'zakef-gadol' },
  { he: 'שַׁלְשֶׁ֓לֶת', en: 'shalshelet' },
  { he: 'שְׁנֵי־גֵרֵשִׁ֞ין', en: 'sheney-gereshin' },
  { he: 'תְּרֵי־טַעֲמֵ֦י', en: 'trey-taamey' },
  { he: 'דַּרְגָּ֧א', en: 'darga' },
  { he: 'תְּבִ֛יר', en: 'tevir' },
  { he: 'מָאֲרִ֥יךְ טַרְחָ֖א אָתְנַ֑ח', en: 'maarih-tarha-atnah' },
  { he: 'יְ֚תִיב', en: 'yetiv' },
  { he: 'מָאֲרִ֥יךְ טַרְחָ֖א סוֹף־פָּסֽוּק׃', en: 'maarih-tarha-sof-pasuk' },
];

const marokaiHaftara = [...marokaiHumash];
marokaiHaftara.splice(7, 1, { he: 'קַדְמָ֨א' });
marokaiHaftara.push({
  he: 'תְּבִ֛יר שסמוך לסוֹף־פָּסֽוּק׃',
  en: 'tevir-before-sof-pasuk',
});

const jerusalemiHumash = [...marokaiHumash];
jerusalemiHumash.splice(7, 1, { he: 'קַדְמָ֨א' });

const jerusalemiHaftara = jerusalemiHumash;

export const ashkenaziHumash = [
  { he: 'פַּשְטָא֙', en: 'pashata' },
  { he: 'מֻנַּ֣ח זַרְקָא֮', en: 'munah-zarka', forTeamimParser: false },
  { he: 'זַרְקָא֮', en: 'zarka', forTeamimButtons: false },
  { he: 'מֻנַּ֣ח סֶגוֹל֒', en: 'munah-segol', forTeamimParser: false },
  { he: 'סֶגוֹל֒', en: 'segol', forTeamimButtons: false },
  {
    he: 'מֻנַּ֣ח מֻנַּ֣ח רְבִיעִ֗י',
    en: 'munah-munah-revii',
    forTeamimParser: false,
  },
  { he: 'רְבִיעִ֗י', en: 'revii', forTeamimButtons: false },
  { he: 'מַהְפַּ֤ך פַּשְטָא֙', en: 'mahapah-pashta' },
  { he: 'זָקֵ֣ף־קָטֹ֔ן', en: 'zakef-katon' },
  { he: 'זָקֵ֣ף־גָּד֕וֹל', en: 'zakef-gadol' },
  { he: 'מֵרְכָ֥א טִפְּחָ֖א', en: 'merha-tipha' },
  { he: 'מֻנַּ֣ח אֶתְנַחְתָּ֑א', en: 'munah-etnahta', forTeamimParser: false },
  { he: 'אֶתְנַחְתָּ֑א', en: 'etnahta', forTeamimButtons: false },
  { he: 'פָּזֵ֡ר', en: 'pazer' },
  { he: 'תְּלִישָׁא־קְטַנָּה֩', en: 'telish-ketana' },
  { he: 'קַדְמָ֨א־וְאַזְלָ֜א', en: 'kadma-veazla' },
  { he: 'אַזְלָא־גֵ֜רֵשׁ', en: 'azla-geresh' },
  { he: 'גֵּרְשַׁ֞יִם', en: 'gershaim' },
  { he: 'דַּרְגָּ֧א', en: 'darga' },
  { he: 'תְּבִ֛יר', en: 'tevir' },
  { he: 'יְ֚תִיב', en: 'yetiv' },
  { he: 'פְּסִיק׀', en: 'pesik' },
  { he: 'סוֹף־פָּסֽוּק׃', en: 'sof-pasuk' },
  { he: 'שַׁלְשֶׁ֓לֶת', en: 'shalshelet' },
  { he: 'קַרְנֵי־פָרָ֟ה', en: 'karney-para' },
  { he: 'מֵרְכָא־כְּפוּלָ֦ה', en: 'merha-kfula' },
  { he: 'יָרֵחַ־בֶּן־יוֹמ֪וֹ', en: 'yerah-ben-yomo' },
];

const ashkenaziHaftara = ashkenaziHumash.filter(
  ({ en }) =>
    !['shalshelet', 'karney-para', 'merha-kfula', 'yerah-ben-yomo'].includes(en)
);

export const allTeamimDic = {
  text: { he: 'נגן את כל הטעמים', en: "Play all Te'amim" },
  en: 'teamim',
};

export const ashkenazi = {
  humash: ashkenaziHumash,
  haftara: ashkenaziHaftara,
};

export const marokai = {
  humash: marokaiHumash,
  haftara: marokaiHaftara,
};

export const jerusalemi = {
  humash: jerusalemiHumash,
  haftara: jerusalemiHaftara,
};
