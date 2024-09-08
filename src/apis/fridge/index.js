import instance from '..';

export const fridgeAPI = {
  addIngredientAPI: (ingredientData) => {
    return instance.post('/fridge', ingredientData);
  },
  getIngredientsAPI: () => {
    return instance.get('/fridge');
  },
  deleteIngredientAPI: (id) => {
    return instance.delete(`/fridge/${id}`);
  },
};
