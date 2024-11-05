import { Page } from 'playwright';

export class AmazonPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://www.amazon.sg/');
  }

  async searchProduct(productName: string, brandName: string) {
    await this.page.fill('#twotabsearchtextbox', productName);
    await this.page.selectOption('#searchDropdownBox', {value: brandName});
    await this.page.click('input[type="submit"]');
    await this.page.waitForSelector('div.s-main-slot');
  }

  async openProduct(productIndex: number) {
    const products = await this.page.locator('div.s-main-slot .s-product-image-container [data-component-type=s-product-image] .a-link-normal');
    await products.nth(productIndex).click();
    await this.page.waitForSelector('select#quantity')
  }

  async addToCart(quantity: number) {
    await this.page.selectOption('#quantity', {value: ''+quantity});
    await this.page.click('#add-to-cart-button');
  }

  async goToCart() {
    await this.page.click('#nav-cart');
  }

  async removeFromCart() {
    await this.page.click('input[value="Delete"]');
  }
}
