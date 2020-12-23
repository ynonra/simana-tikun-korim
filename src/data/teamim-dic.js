export const marokaiHumash = [
  {
    heb: 'זַרְקָא֮ מַקַּףְ־שׁוֹפָר הוֹלֵ֣ךְ סֶגוֹלְתָא֒',
    en: 'zarka-makaf-shofar-holeh-segolata',
  },
  { heb: 'פָּזֵר-גָּד֡וֹל', en: 'pazer-gadol' },
  { heb: 'גַּעְיָֽא' },
  { heb: 'תַ֠לְשָׁא', en: 'talsha' },
  { heb: 'אַזְלָ֨א-גֵּרִ֜ישׁ', en: 'azla-gerish' },
  { heb: 'פָּסֵ֣ק׀', en: 'pasek' },
  { heb: 'רָבִ֗יעַ', en: 'ravia' },
  { heb: 'קַדְמָ֨א', en: 'kadma' },
  { heb: 'שׁוֹפָר מְהֻפָּ֤ךְ', en: 'shofar-mehupah' },
  { heb: 'פַּשְטָא֙', en: 'pashta' },
  { heb: 'תְּרֵי־קַ֨דְמִין֙', en: 'trey-kadmin' },
  { heb: 'זָקֵ֣ף־קָטֹ֔ן', en: 'zakef-katon' },
  { heb: 'זָקֵ֣ף־גָּד֕וֹל', en: 'zakef-gadol' },
  { heb: 'שַׁלְשֶׁ֓לֶת', en: 'shalshelet' },
  { heb: 'שְׁנֵי־גֵרֵשִׁ֞ין', en: 'sheney-gereshin' },
  { heb: 'תְּרֵי־טַעֲמֵ֦י', en: 'trey-taamey' },
  { heb: 'דַּרְגָּ֧א', en: 'darga' },
  { heb: 'תְּבִ֛יר', en: 'tevir' },
  { heb: 'מָאֲרִ֥יךְ טַרְחָ֖א אָתְנַ֑ח', en: 'maarih-tarha-atnah' },
  { heb: 'יְ֚תִיב', en: 'yetiv' },
  { heb: 'מָאֲרִ֥יךְ טַרְחָ֖א סוֹף־פָּסֽוּק׃', en: 'maarih-tarha-sof-pasuk' },
];

const marokaiHaftara = [...marokaiHumash];
marokaiHaftara.splice(7, 1, { heb: 'קַדְמָ֨א' });
marokaiHaftara.push({
  heb: 'תְּבִ֛יר שסמוך לסוֹף־פָּסֽוּק׃',
  en: 'tevir-before-sof-pasuk',
});

const jerusalemiHumash = [...marokaiHumash];
jerusalemiHumash.splice(7, 1, { heb: 'קַדְמָ֨א' });

const jerusalemiHaftara = jerusalemiHumash;

export const ashkenaziHumash = [
  { heb: 'פַּשְטָא֙', en: 'pashata' },
  { heb: 'מֻנַּ֣ח זַרְקָא֮', en: 'munah-zarka', forTeamimParser: false },
  { heb: 'זַרְקָא֮', en: 'zarka', forTeamimButtons: false },
  { heb: 'מֻנַּ֣ח סֶגוֹל֒', en: 'munah-segol', forTeamimParser: false },
  { heb: 'סֶגוֹל֒', en: 'segol', forTeamimButtons: false },
  {
    heb: 'מֻנַּ֣ח מֻנַּ֣ח רְבִיעִ֗י',
    en: 'munah-munah-revii',
    forTeamimParser: false,
  },
  { heb: 'רְבִיעִ֗י', en: 'revii', forTeamimButtons: false },
  { heb: 'מַהְפַּ֤ך פַּשְטָא֙', en: 'mahapah-pashta' },
  { heb: 'זָקֵ֣ף־קָטֹ֔ן', en: 'zakef-katon' },
  { heb: 'זָקֵ֣ף־גָּד֕וֹל', en: 'zakef-gadol' },
  { heb: 'מֵרְכָ֥א טִפְּחָ֖א', en: 'merha-tipha' },
  { heb: 'מֻנַּ֣ח אֶתְנַחְתָּ֑א', en: 'munah-etnahta', forTeamimParser: false },
  { heb: 'אֶתְנַחְתָּ֑א', en: 'etnahta', forTeamimButtons: false },
  { heb: 'פָּזֵ֡ר', en: 'pazer' },
  { heb: 'תְּלִישָׁא־קְטַנָּה֩', en: 'telish-ketana' },
  { heb: 'קַדְמָ֨א־וְאַזְלָ֜א', en: 'kadma-veazla' },
  { heb: 'אַזְלָא־גֵ֜רֵשׁ', en: 'azla-geresh' },
  { heb: 'גֵּרְשַׁ֞יִם', en: 'gershaim' },
  { heb: 'דַּרְגָּ֧א', en: 'darga' },
  { heb: 'תְּבִ֛יר', en: 'tevir' },
  { heb: 'יְ֚תִיב', en: 'yetiv' },
  { heb: 'פְּסִיק׀', en: 'pesik' },
  { heb: 'סוֹף־פָּסֽוּק׃', en: 'sof-pasuk' },
  { heb: 'שַׁלְשֶׁ֓לֶת', en: 'shalshelet' },
  { heb: 'קַרְנֵי־פָרָ֟ה', en: 'karney-para' },
  { heb: 'מֵרְכָא־כְּפוּלָ֦ה', en: 'merha-kfula' },
  { heb: 'יָרֵחַ־בֶּן־יוֹמ֪וֹ', en: 'yerah-ben-yomo' },
];

const ashkenaziHaftara = ashkenaziHumash.filter(
  ({ en }) =>
    !['shalshelet', 'karney-para', 'merha-kfula', 'yerah-ben-yomo'].includes(en)
);

export const allTeamimDic = {
  heb: 'נגן את כל הטעמים',
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
