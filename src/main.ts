async function main() {
  const { RecipeRepositoryMemory } = await import('./recipe-repository-memory');
  console.log(await new RecipeRepositoryMemory().getRecipes());
}

main();
