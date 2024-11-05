// src/tests/amazon.test.ts
import { chromium } from 'playwright';
import { test, expect } from '@playwright/test';
import { AmazonPage } from '../src/pages/AmazonPage';

test.describe('Amazon E2E Tests', () => {
  let amazonPage: AmazonPage;

  test.beforeEach(async ({ page }) => {
    amazonPage = new AmazonPage(page);
    await amazonPage.open();
  });

  test('should be able to search, add to cart and remove item', async () => {
    // Search for a product
    await amazonPage.searchProduct('camera', 'search-alias=electronics');

    // Open first product
    await amazonPage.openProduct(0);

    // Add to cart with quantity 2
    await amazonPage.addToCart(2);
    
    // Go to cart
    await amazonPage.goToCart();

    // Remove from cart
    await amazonPage.removeFromCart();
  });
});
