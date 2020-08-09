import { MyAppPage } from './app.po';

describe('my-app App', () => {
  let page: MyAppPage;

  beforeEach(() => {
    page = new MyAppPage();
  });

  it('should display message saying Zoo Example', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Zoo Example');
  });
});
