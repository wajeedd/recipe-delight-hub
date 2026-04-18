import type { RecipeCardData } from "@/components/RecipeCard";

export type StarterRecipe = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
  video_url: string | null;
  ingredients: string[];
  steps: string[];
  prep_time: number | null;
  cook_time: number | null;
  servings: number | null;
};

export const STARTER_RECIPES: StarterRecipe[] = [
  {
    id: "starter-avocado-toast",
    user_id: "starter",
    title: "Avocado Toast with Chili Flakes",
    description: "Quick breakfast toast with creamy avocado and a gentle chili kick.",
    category: "Breakfast",
    image_url: "https://imgs.search.brave.com/vaJjBv1Ghw47hOes2_JT4DB8Z9qg7el9Aa1oLd4rkaA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9mcmVz/aC1hdm9jYWRvLXRv/YXN0LXNlcnZlZC12/aWJyYW50LWdhcm5p/c2hlcy1kZWxpY2lv/dXMtYmVhdXRpZnVs/bHktcGxhdGVkLXRv/cHBlZC1yYWRpc2hl/cy1ncmVlbnMtYWxv/bmdzaWRlLXNhdWNl/cy00MDc3NjUwNDQu/anBn",
    video_url: "https://youtu.be/dP6btliLGy4?si=kcuGafOBjVnB4Fiy",
    ingredients: ["2 bread slices", "1 ripe avocado", "Salt", "Black pepper", "Chili flakes", "1 tsp lemon juice"],
    steps: [
      "Toast bread slices until crisp and golden.",
      "Mash avocado with lemon juice, salt, and pepper.",
      "Spread avocado on toast and finish with chili flakes.",
    ],
    prep_time: 8,
    cook_time: 2,
    servings: 1,
  },
  {
    id: "starter-veggie-omelette",
    user_id: "starter",
    title: "Veggie Omelette",
    description: "Fluffy omelette with onion, tomato, and bell pepper.",
    category: "Breakfast",
    image_url: "https://imgs.search.brave.com/L1HpGtr_TyJ7AbhQrdjG7ZSiDL9hg4wCHiBR6ypkxwQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vdmlk/ZW9zL3RodW1ibmFp/bHMvb3JpZ2luYWxz/LzY4L2Q2L2VhLzY4/ZDZlYTM2YzA5Zjdk/NTJiNTVjYTM4ODMx/MTU1Y2FhLjAwMDAw/MDAuanBn",
    video_url: "https://youtube.com/shorts/bJSLKjhU1IQ?si=FYC3keVn7Kk-HFQN",
    ingredients: ["3 eggs", "2 tbsp chopped onion", "2 tbsp chopped tomato", "2 tbsp chopped bell pepper", "Salt", "1 tsp oil"],
    steps: [
      "Beat eggs with salt and chopped vegetables.",
      "Heat oil in a pan and pour the egg mix.",
      "Cook on medium heat until set, fold, and serve.",
    ],
    prep_time: 7,
    cook_time: 6,
    servings: 1,
  },
  {
    id: "starter-chickpea-salad",
    user_id: "starter",
    title: "Chickpea Salad Bowl",
    description: "Protein-rich salad with fresh vegetables and lemon dressing.",
    category: "Lunch",
    image_url: "https://imgs.search.brave.com/p-9wrReU8eeKIY4lCmOt_m8BCcMsKrrJvpPUUTvJWpU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aG93c3dlZXRlYXRz/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wMS9jcmlz/cHktY2hpY2twZWEt/Y2hvcHBlZC1zYWxh/ZC02LTI1MHgyNTAu/anBn",
    video_url: "https://youtube.com/shorts/Gu6egXFR8og?si=fyzvKBceuKOzE7X8",
    ingredients: ["1 cup boiled chickpeas", "1 chopped cucumber", "1 chopped tomato", "2 tbsp chopped onion", "1 tbsp olive oil", "1 tbsp lemon juice", "Salt"],
    steps: [
      "Combine chickpeas and chopped vegetables in a bowl.",
      "Whisk oil, lemon juice, and salt for dressing.",
      "Toss everything and serve fresh.",
    ],
    prep_time: 10,
    cook_time: 0,
    servings: 2,
  },
  {
    id: "starter-tomato-pasta",
    user_id: "starter",
    title: "Garlic Tomato Pasta",
    description: "Simple pasta in a quick garlic tomato sauce.",
    category: "Lunch",
    image_url: "https://imgs.search.brave.com/35yUaiAWjeAKoI-BWN674_DtCkyPBoICOVjQurac2U8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzIv/MDA3LzkxMi9zbWFs/bC9wYXN0YS1pbi1h/LWJvd2wtd2l0aC10/b21hdG9lcy1oZXJi/cy1hbmQtZ2FybGlj/LXBob3RvLmpwZw",
    video_url: "https://youtube.com/shorts/U-4MCjHtLIs?si=H9_l2TVAA2_XtpJW",
    ingredients: ["200 g pasta", "2 tbsp olive oil", "4 garlic cloves", "2 cups tomato puree", "Salt", "Black pepper", "Basil leaves"],
    steps: [
      "Boil pasta in salted water until al dente.",
      "Saute garlic in olive oil, then add tomato puree and seasonings.",
      "Mix pasta with sauce and garnish with basil.",
    ],
    prep_time: 10,
    cook_time: 15,
    servings: 2,
  },
  {
    id: "starter-paneer-butter-masala",
    user_id: "starter",
    title: "Paneer Butter Masala",
    description: "Rich and creamy paneer curry for a comforting dinner.",
    category: "Dinner",
    image_url: "https://imgs.search.brave.com/CzoOMf-1V4I4YmxuQhhiSfZYRT29kDsJSwd5r9BuiGQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2hhcm1pc3Bhc3Np/b25zLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxNS8wOS9w/YW5lZXItYnV0dGVy/LW1hc2FsYS1zdGVw/MTcuanBn",
    video_url: "https://youtube.com/shorts/oeccGNt6fjA?si=3KxJPXaNblvmyh1o",
    ingredients: ["250 g paneer cubes", "2 tbsp butter", "1 cup tomato puree", "1/2 cup cream", "1 tsp ginger-garlic paste", "Salt", "1 tsp garam masala"],
    steps: [
      "Heat butter and saute ginger-garlic paste.",
      "Add tomato puree, spices, and cook until thick.",
      "Add paneer and cream, simmer for 5 minutes, then serve.",
    ],
    prep_time: 12,
    cook_time: 20,
    servings: 3,
  },
  {
    id: "starter-veg-fried-rice",
    user_id: "starter",
    title: "Veg Fried Rice",
    description: "One-pan rice with colorful vegetables and soy sauce.",
    category: "Dinner",
    image_url: "https://imgs.search.brave.com/5Y0ophpiW3YgIJ74fLquKQSO60J1v0hsudduDpVw5yM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vY29va2lu/Z2Zyb21oZWFydC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MTYvMDIvVmVnLUZy/aWVkLVJpY2UtMy5q/cGc_cmVzaXplPTY4/NCwxMDI0JnNzbD0x",
    video_url: "https://youtube.com/shorts/6NDB035TTFw?si=eu6Cv8VDyvvrZZjh",
    ingredients: ["2 cups cooked rice", "1 cup mixed vegetables", "2 tbsp soy sauce", "1 tbsp oil", "2 garlic cloves", "Salt", "Pepper"],
    steps: [
      "Heat oil and saute garlic for 30 seconds.",
      "Add vegetables and stir-fry on high heat.",
      "Add rice, soy sauce, salt, and pepper. Toss and serve hot.",
    ],
    prep_time: 10,
    cook_time: 12,
    servings: 2,
  },
  {
    id: "starter-chocolate-mug-cake",
    user_id: "starter",
    title: "Chocolate Mug Cake",
    description: "Single-serve dessert ready in minutes.",
    category: "Dessert",
    image_url: "https://imgs.search.brave.com/ubPQp37JaCfMt4DrFtvHNjWEK2iPHUJSMNAI5m_rcfw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2hhcm1pc3Bhc3Np/b25zLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMi8wMi9j/aG9jb2xhdGUtbXVn/LWNha2Utc3RlcDEw/LmpwZw",
    video_url: "https://youtube.com/shorts/9gy-tu7fxms?si=d2frTIZHm2io6-1b",
    ingredients: ["4 tbsp flour", "2 tbsp cocoa powder", "2 tbsp sugar", "3 tbsp milk", "2 tbsp oil", "1/4 tsp baking powder"],
    steps: [
      "Mix all ingredients into a smooth batter in a mug.",
      "Microwave for 70 to 90 seconds.",
      "Cool slightly and enjoy warm.",
    ],
    prep_time: 5,
    cook_time: 2,
    servings: 1,
  },
  {
    id: "starter-fruit-yogurt-parfait",
    user_id: "starter",
    title: "Fruit Yogurt Parfait",
    description: "Layered yogurt, fruit, and granola dessert cup.",
    category: "Dessert",
    image_url: "https://imgs.search.brave.com/tFM4_wlduCJR2hpq7F3FSL0BC8DDo1HeirR__HUjzOI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mZWVs/Z29vZGZvb2RpZS5u/ZXQvd3AtY29udGVu/dC91cGxvYWRzLzIw/MjQvMDcvU3RyYXdi/ZXJyeS1QYXJmYWl0/LTA4LmpwZw",
    video_url: "https://youtube.com/shorts/BDq_-y1JSgo?si=EZhPRFpvOLwxH4rH",
    ingredients: ["1 cup yogurt", "1/2 cup mixed fruits", "1/4 cup granola", "1 tbsp honey"],
    steps: [
      "Layer yogurt, fruits, and granola in a glass.",
      "Repeat layers and drizzle honey on top.",
      "Serve immediately.",
    ],
    prep_time: 6,
    cook_time: 0,
    servings: 1,
  },
  {
    id: "starter-masala-sandwich",
    user_id: "starter",
    title: "Masala Veg Sandwich",
    description: "Toasted sandwich stuffed with spiced veggies.",
    category: "Snacks",
    image_url: "https://imgs.search.brave.com/Kqg92xyp55GjA9jTiDuScDV6XGrM4FrJlH0f2MI9DMw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdmVnY29v/a2Jvb2submV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIxLzA0/LzUxMTA3NTY1Mjcz/XzFhOTEzZTNiNGRf/Yy5qcGc_cmVzaXpl/PTYwNSw4MDAmc3Ns/PTE",
    video_url: "https://youtube.com/shorts/AlZr5PEpdlw?si=18Nb0voBqLtrMY7R",
    ingredients: ["4 bread slices", "1 boiled potato", "1/4 cup onion", "1/4 cup capsicum", "1 tsp sandwich masala", "2 tsp butter", "Salt"],
    steps: [
      "Mash potato with vegetables, masala, and salt.",
      "Spread filling between bread slices and butter outside.",
      "Toast on a pan or sandwich maker until crisp.",
    ],
    prep_time: 12,
    cook_time: 8,
    servings: 2,
  },
  {
    id: "starter-roasted-makhana",
    user_id: "starter",
    title: "Spiced Roasted Makhana",
    description: "Light roasted fox nuts with warm spices.",
    category: "Snacks",
    image_url: "https://imgs.search.brave.com/fWZfM2YZWJ_7KfYYfzobhkADEVCN_5CvcuytZ7P0Osg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dGFybGFkYWxhbC5j/b20vbWVkaWEvcmVj/aXBlL21ldGhvZC8y/MDI1LzAxLzE2L21h/c2FsYS1tYWtoYW5h/LXN0ZXAtMTEtMTEt/MTg5OTgwLndlYnA_/dz04MDAmZm9ybWF0/PXdlYnA",
    video_url: "https://youtube.com/shorts/k50RTaKVR34?si=6_VP0kYon9v_ToCM",
    ingredients: ["3 cups makhana", "1 tbsp ghee", "1/2 tsp turmeric", "1/2 tsp chili powder", "Salt"],
    steps: [
      "Heat ghee in a pan on low heat.",
      "Add makhana and roast until crunchy.",
      "Add spices and salt, mix well, and cool before serving.",
    ],
    prep_time: 3,
    cook_time: 10,
    servings: 3,
  },
  {
    id: "starter-mango-lassi",
    user_id: "starter",
    title: "Mango Lassi",
    description: "Refreshing yogurt drink with ripe mango.",
    category: "Drinks",
    image_url: "https://imgs.search.brave.com/wvg5-HPwV7Ww1bhSO-MbS-tgunkzlSu_gyiMNQ8ubCo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXNh/bGFhbmRjaGFpLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8wNS9NYW5nby1M/YXNzaS1TcGlsbGVk/LmpwZw",
    video_url: "https://youtube.com/shorts/nNF1idZnz1U?si=hvFgzKKZWCQvpaUb",
    ingredients: ["1 cup ripe mango cubes", "1 cup chilled yogurt", "1/2 cup cold water", "1 tbsp sugar", "Ice cubes"],
    steps: [
      "Blend mango, yogurt, water, and sugar until smooth.",
      "Adjust sweetness and thickness as needed.",
      "Serve chilled with ice cubes.",
    ],
    prep_time: 5,
    cook_time: 0,
    servings: 2,
  },
  {
    id: "starter-veg-green-smoothie",
    user_id: "starter",
    title: "Green Smoothie",
    description: "A light vegan smoothie with spinach and banana.",
    category: "Vegan",
    image_url: "https://imgs.search.brave.com/RkQ6G0MT2WexsyigEbqGOR891yDvjDCJdeoEHAagioE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS1jbGRucnkucy1u/YmNuZXdzLmNvbS9p/bWFnZS91cGxvYWQv/dF9mb2NhbC02MDB4/MzAwLGZfYXV0byxx/X2F1dG86YmVzdC9u/ZXdzY21zLzIwMjBf/MDMvMTUyODM4NC9j/YXRoZXJpbmUtbWNj/b3JkLXRvZGF5LW1h/aW4tMjAwMTE0LTAx/LmpwZw",
    video_url: "https://youtube.com/shorts/4S93_04kF4I?si=89Z1Uj2kGXu-9rXB",
    ingredients: ["1 banana", "1 cup spinach", "1/2 cup pineapple", "1 cup water", "1 tsp chia seeds"],
    steps: [
      "Add all ingredients to a blender.",
      "Blend until smooth and creamy.",
      "Serve immediately.",
    ],
    prep_time: 5,
    cook_time: 0,
    servings: 1,
  },
  {
  id: "starter-veg-aloo-gobi",
  user_id: "starter",
  title: "Aloo Gobi",
  description: "A classic vegetarian Indian dish made with potatoes, cauliflower, and aromatic spices.",
  category: "Vegetarian",
  image_url: "https://imgs.search.brave.com/i0BVkTnVaXL6qj1ZWfFotO-8yo49SuU4rUrpsMxOCq8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9hbG9v/LWdvYmktcG90YXRv/LWNhdWxpZmxvd2Vy/LWN1cnJ5LWluZGlh/bi1wdW5qYWJpLXZl/Z2V0YXJpYW4tZm9v/ZC0yODY3OTg2Mzcu/anBn",
  video_url: "https://youtube.com/shorts/2lNU1QT3bK4?si=i9O3ZLvSrLGcsXTQ",
  ingredients: [
    "2 potatoes (cubed)",
    "1 small cauliflower (florets)",
    "1 onion (chopped)",
    "2 tomatoes (chopped)",
    "2 tbsp oil",
    "1 tsp ginger garlic paste",
    "1/2 tsp turmeric powder",
    "1 tsp chili powder",
    "1/2 tsp garam masala",
    "Salt to taste",
    "Fresh coriander leaves"
  ],
  steps: [
    "Heat oil in a pan and sauté onions until golden.",
    "Add ginger garlic paste and cook for 1 minute.",
    "Add tomatoes and cook until soft.",
    "Add turmeric, chili powder, garam masala, and salt.",
    "Add potatoes and cauliflower, mix well.",
    "Cover and cook until vegetables are tender.",
    "Garnish with coriander leaves and serve hot."
  ],
  prep_time: 15,
  cook_time: 25,
  servings: 3,
},
];

export const STARTER_RECIPE_BY_ID = Object.fromEntries(
  STARTER_RECIPES.map((recipe) => [recipe.id, recipe]),
) as Record<string, StarterRecipe>;

export function toRecipeCard(recipe: StarterRecipe): RecipeCardData {
  return {
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    category: recipe.category,
    image_url: recipe.image_url,
  };
}
