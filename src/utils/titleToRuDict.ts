export type titleToRuDictType = {
  dialogs: string;
  lists: string;
  scenarios: string;
};

export const titleToRuDict: titleToRuDictType = {
  dialogs: 'Диалоги',
  lists: 'Списки',
  scenarios: 'Сценарии',
};

export const titleToRu = (title: string) => {
  return titleToRuDict[title as keyof titleToRuDictType];
};
