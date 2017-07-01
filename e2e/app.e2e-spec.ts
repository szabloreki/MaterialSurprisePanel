import { PanelAdminPage } from './app.po';

describe('panel-admin App', () => {
  let page: PanelAdminPage;

  beforeEach(() => {
    page = new PanelAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to spa!!');
  });
});
