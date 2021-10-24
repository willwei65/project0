import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.modal';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe("Pizza",
     "Homemade Pizza Recipe", 
    "https://th.bing.com/th/id/R.005397720bf2d8d8a3cf98b5bb303149?rik=dbgUk3DS7JiMdQ&pid=ImgRaw&r=0",
    [
      new Ingredient("Dough", 1),
      new Ingredient("Tomato", 1),
      new Ingredient("Ground Beef", 1),
      new Ingredient("mozzarella cheese", 1),
      new Ingredient("Black Olive", 10),
      new Ingredient("Mushroom", 5),
      new Ingredient("Chili Powder",1),
      new Ingredient("Chives",1),
    ]),
    new Recipe("Pasta",
     "Homemade Pasta Recipe", 
     "https://cdn.nonnabox.com/wp-content/uploads/dsc_0269-e1375901403609.jpg",
     [
      new Ingredient("Tomatoe", 2),
      new Ingredient("garlic", 4),
      new Ingredient("black pepper", 1),
      new Ingredient("salt", 1),
      new Ingredient("package angel pasta", 1),
      new Ingredient("Parmesan cheese", 1/4)
     ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(){
    return [...this.recipes];
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngreidentsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }
  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice())
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }
}
