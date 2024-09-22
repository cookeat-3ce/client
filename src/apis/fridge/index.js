import instance from '..';

/**
 * 사용자 냉장고 API
 *
 * @author 김지수
 * @version 1.0
 * @since 2024.09.06
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.06    김지수       최초 생성, 사용자 냉장고 속 식재료 리스트 조회
 * </pre>
 */
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
