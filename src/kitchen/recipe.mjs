import { shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import { io } from 'socket.io-client';
import { nanoid } from './nanoid.mjs';

export default {
  template: `
  <ul>
    <li v-for="ingredient in ingredients" :key="ingredient.id">
      <input :value="ingredient.quantity" style="width: 40px" @input="e => updateField(ingredient.id, 'quantitiy', e.target.value)">

      <select :value="ingredient.unit" style="width: 100px" @input="e => updateField(ingredient.id, 'unit', e.target.value)">

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

      <input v-model="ingredient.name" @input="e => updateField(ingredient.id, 'name', e.target.value)">
    </li>
    <li><button @click="addIngredient" type="button">ADD INGREDIENT</button></li>
  </ul>
  `,
  setup() {
    const route = useRoute();
    const ingredients = shallowRef();
    const recipeId = route.params.recipeId;
    const socket = io('http://localhost:3000/ingredients');

    ingredients.value = [];

    // @todo set ingredients on load

    // @todo add ingredient on event

    // @todo update field on event

    function _addIngredient(ingredient) {
      ingredients.value = [...ingredients.value, ingredient];
    }

    function _updateIngredient({ ingredientId, changes }) {
      ingredients.value = ingredients.value.map((ingredient) =>
        ingredient.id === ingredientId
          ? { ...ingredient, ...changes }
          : ingredient
      );
    }

    return {
      addIngredient() {
        const ingredient = {
          id: nanoid(),
          name: null,
          quantity: null,
          unit: null,
        };
        _addIngredient(ingredient);

        // @todo emit new ingredient
      },
      updateField(ingredientId, field, value) {
        const changes = { [field]: value };
        // @todo emit ingredient change
      },
      ingredients,
    };
  },
};
