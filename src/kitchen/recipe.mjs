import { shallowRef } from 'vue';
import { useRoute } from 'vue-router';

export default {
  template: `
  <ul>
    <li v-for="ingredient in ingredients" :key="ingredient.id">
      <input
        :value="ingredient.quantity"
        @input="e => updateIngredient(ingredient.id, {quantity: e.target.value})"
        style="width: 40px"
        type="number">

      <select
        :value="ingredient.unit"
        @input="e => updateIngredient(ingredient.id, {unit: e.target.value})"
        style="width: 100px">

        <option value="">--Please choose a unit--</option>
        <option value="g">Grams</option>
        <option value="kg">Kilograms</option>
        <option value="ml">Milliliters</option>
        <option value="cl">Centiliters</option>
        <option value="l">Liters</option>

        <option value="pinch">Pinches</option>
        <option value="coffee-spoon">Coffee Spoon</option>
        <option value="soup-spoon">Soup Spoon</option>

      </select>

      <input 
        :value="ingredient.name"
        @input="e => updateIngredient(ingredient.id, {name: e.target.value})">
    </li>

    <li><button @click="addIngredient" type="button">ADD INGREDIENT</button></li>

  </ul>
  `,
  setup() {
    const apiBaseUrl = 'http://localhost:3000';
    const route = useRoute();
    const ingredients = shallowRef();
    const recipeId = route.params.recipeId;
    const ingredientChangesSource = new EventSource(
      `${apiBaseUrl}/recipes/${recipeId}/ingredient-changes`
    );

    ingredients.value = [];

    ingredientChangesSource.onmessage = (message) => {
      // @todo update ingredients list.
    };

    function _addIngredient({ ingredient }) {
      ingredients.value = [...ingredients.value, ingredient];
    }

    function _updateIngredient({ ingredientId, changes }) {
      ingredients.value = ingredients.value.map((ingredient) =>
        ingredient.id === ingredientId
          ? { ...ingredient, ...changes }
          : ingredient
      );
    }

    function _upsertIngredient({ ingredient }) {
      if (
        ingredients.value.find(
          (_ingredient) => _ingredient.id === ingredient.id
        )
      ) {
        _updateIngredient({ ingredientId: ingredient.id, changes: ingredient });
      } else {
        _addIngredient({ ingredient });
      }
    }

    return {
      async addIngredient() {
        // @todo send ingredient to POST `${apiBaseUrl}/recipes/${recipeId}/ingredients`.
        // @todo add returned ingredient to `ingredients.value` list.
      },
      async updateIngredient(ingredientId, changes) {
        // @todo update ingredient in `ingredients.value` list.
        // @todo send ingredient changes to PATCH `${apiBaseUrl}/ingredients/${ingredientId}`.
      },
      ingredients,
    };
  },
};

async function sendJsonRequest(url, { method, data }) {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
}
