async function main() {
  const { RecipeRepository } = await import('./recipe-repository');
  console.log(await new RecipeRepository().getRecipes());
}

main();
