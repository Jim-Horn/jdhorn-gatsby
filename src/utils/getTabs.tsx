enum Tabs {
  HTML = 'html',
  CSS = 'css',
  JS = 'js',
  None = '',
}
export const getTabs = (defaultTab: keyof typeof Tabs, showResult: boolean) => {
  const result = [];
  if (defaultTab !== 'None') {
    result.push(Tabs[defaultTab]);
  }
  if (showResult) {
    result.push('result');
  }
  return result.join(',');
};
