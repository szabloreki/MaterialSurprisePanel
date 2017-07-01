import { browser, by, element } from 'protractor';

export class PanelAdminPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('spa-root h1')).getText();
  }
}
