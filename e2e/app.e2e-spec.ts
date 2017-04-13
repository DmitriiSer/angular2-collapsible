import { Angular2CollapsiblePage } from './app.po';

describe('angular2-collapsible App', () => {
  let page: Angular2CollapsiblePage;

  beforeEach(() => {
    page = new Angular2CollapsiblePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
