import instance from '..';

export const fridgeAPI = {
  addIngredientAPI: (ingredientData) => {
    return instance.post('/fridge', ingredientData);
  },
  getIngredientsAPI: (filtering) => {
    return instance.get(`/fridge?filtering=${filtering}`);
  },
  deleteIngredientAPI: (id) => {
    return instance.delete(`/fridge/${id}`);
  },
};
