import * as puppeteer from 'puppeteer';

export async function scrapRecipeById(recipeId: string) {
  return scrapRecipeByUrl(
    `https://ottolenghi.co.uk/recipes/${encodeURIComponent(recipeId)}`
  );
}

export async function scrapRecipeByUrl(recipeUrl: string) {
  const scraper = await _createScraper(recipeUrl);

  /* Parallelize all queries. */
  const results = await Promise.all([
    /* Description. */
    scraper.getText('.description').then((description) => ({ description })),
    /* Name. */
    scraper.getText('title').then((title) => ({ name: title?.split(' (')[0] })),
    /* Ingredients. */
    (async () => {
      const rawIngredients = await scraper.getTexts('.cooking-ingredients li');
      const ingredients = await Promise.all(
        rawIngredients.map((raw) => _parseIngredient(raw))
      );
      return { ingredients };
    })(),
    /* Picture. */
    scraper.getPictureUri('.ct-image').then((pictureUri) => ({ pictureUri })),
    /* Steps. */
    scraper.getTexts('.method li').then((steps) => ({ steps })),
  ]);

  /* Merge all partial results. */
  const recipe = results.reduce((acc, result) => ({ ...acc, ...result }), {});

  const recipeUrlBlocks = recipeUrl.split('/');
  const id = recipeUrlBlocks[recipeUrlBlocks.length - 1];

  await scraper.close();

  return {
    id,
    ...recipe,
  };
}

async function _parseIngredient(
  rawIngredient: string
): Promise<{ quantity?: { amount: number; unit: string }; name: string }> {
  const rawAmount = rawIngredient.match(/^\d+/)?.[0];

  if (!rawAmount) {
    return {
      name: rawIngredient,
    };
  }

  rawIngredient = rawIngredient.substring(rawAmount.length);

  /* Parse unit. */
  const [unitAndSpaces = null, unit = 'unit'] =
    rawIngredient.match(/^ *(g|ml|tbsp|tsp) /) ?? [];
  rawIngredient = rawIngredient.substring(unitAndSpaces?.length);

  return {
    quantity: {
      amount: parseFloat(rawAmount),
      unit,
    },
    name: rawIngredient.trim(),
  };
}

async function _createScraper(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  return {
    async close() {
      await browser.close();
    },
    async getPictureUri(selector: string) {
      return await page.$eval(selector, (el) => (el as HTMLImageElement).src);
    },
    async getText(selector: string) {
      return await page.$eval(selector, (el) => el?.textContent?.trim());
    },
    async getTexts(selector: string) {
      return await page.$$eval(selector, (els) =>
        els.map((el) => el?.textContent?.trim())
      );
    },
  };
}
