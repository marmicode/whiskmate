import { onMounted, shallowRef } from 'vue';

export default {
  template: `
<ul>
  <li v-for="recipe in recipes" :key="recipe.id">
  
    <span>{{ recipe.name }}</span>
    <span>&nbsp;</span>
    
    <router-link :to="{name: 'recipe', params: {recipeId: recipe.id}}">
      <button type="button">EDIT</button>
    </router-link>
    
  </li>
</ul>

<div v-if="unauthorized">
  <h1>Can't retrieve recipes</h1>
  <span>Try starting server without auth:</span>
  <br>
  <br>
  <code style="margin-left: 50px">DISABLE_AUTH=true npm start</code>
</div>
`,
  setup() {
    const unauthorized = shallowRef(false);
    const recipes = shallowRef([]);

    onMounted(async () => {
      const response = await fetch('http://localhost:3000/recipes');
      if (response.status === 401) {
        unauthorized.value = true;
        return;
      }

      recipes.value = (await response.json()).items;
    });

    return {
      unauthorized,
      recipes,
    };
  },
};
