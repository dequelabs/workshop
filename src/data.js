// default data (the initial state of the fake database of recipes)
const data = [
  {
    name: 'Chocolate Cake',
    date: '11/17/2018',
    cookCount: 1,
    image: '/food/cake.png',
    prepTime: '20 min',
    cookTime: '30 min',
    difficulty: 'Beginner',
    greaseFireCount: 0,
    yumminess: 50,
    ingredients: [
      '2 cups white sugar',
      '1 3/4 cups of all-purpose flour',
      '3/4 cup unsweetened cocoa powder',
      '1 1/2 teaspoons baking powder',
      '1 1/2 teaspoons baking soda',
      '1 teaspoon of salt',
      '2 eggs',
      '1 cup milk',
      '1/2 cup vegetable oil',
      '2 teaspoons vanilla extract',
      '1 cup boiling water'
    ],
    instructions: [
      'Preheat oven to 350 degrees F (175 degrees C)',
      'In a large bowl, stir together the sugar, flour, cocoa, baking poweder, baking soda and salt. Add the eggs, milk, oil and vanilla, mix for 2 mins on medium speed of mixer. Stir in the boiling water last. Batter will be thin. Pour evenly into prepared pans.',
      'Bake 30 to 35 minutes in the preheated oven, until the cake tests done with a toothpick. Cool in the pans for 10 minutes, then remove to a wire rack to completely cool down.'
    ]
  },
  {
    name: "Mom's Spaghetti",
    date: '1/19/2019',
    cookCount: 0,
    image: '/food/spaget.png',
    prepTime: '10 min',
    cookTime: '50 min',
    difficulty: 'Beginner',
    greaseFireCount: 0,
    yumminess: 29,
    ingredients: [
      '1 pound ground beef',
      '1 large onion, chopped',
      '2 garlic cloves, minced',
      '1(8 - ounce) can tomato sauce',
      '3 cups tomato juice',
      '1 cup water',
      '1 teaspoon salt',
      '1 teaspoon sugar',
      '2 to 3 teaspoons chili powder',
      '1 teaspoon dried oregano',
      'Dash of pepper',
      '1(7 - ounce) package spaghetti, uncooked',
      'Grated Parmesan cheese',
      'Garnish: fresh Italian parsley sprigs'
    ],
    instructions: [
      'Cook first 3 ingredients in a Dutch oven, stirring until beef crumbles and is no longer pink; drain well. Return beef mixture to pan. Stir in tomato sauce and next 8 ingredients; bring to a boil. Cover, reduce heat, and simmer, stirring often, 30 minutes.',
      'Add pasta; cover and simmer, stirring often, 20 minutes or until pasta is tender. Serve with cheese, and garnish, if desired.'
    ]
  },
  {
    name: 'Filet Mignon',
    date: '2/11/2019',
    cookCount: 2,
    image: '/food/steak.png',
    prepTime: '10 min',
    cookTime: '50 min',
    difficulty: 'Intermediate',
    greaseFireCount: 2,
    yumminess: 50,
    ingredients: [
      '2 tbsp.extra - virgin olive oil',
      '4(6 - oz.) filet mignon',
      'Kosher salt',
      'Freshly ground black pepper',
      '4 tbsp.butter',
      '1 tbsp.roughly chopped rosemary'
    ],
    instructions: [
      'Preheat oven to 400°.In a large skillet over medium - high heat, heat oil.Season steak with salt and pepper on both sides.When oil is just about to smoke, add steak.Cook until very seared, about 5 minutes, then flip and add butter and rosemary.Baste with butter and cook another 5 minutes.',
      'Transfer skillet to oven and cook until cooked to your liking, about 10 minutes for medium.',
      'Remove from pan and let rest 5 minutes before slicing.'
    ]
  },
  {
    name: 'Mega Burger',
    date: '12/12/2018',
    cookCount: 3,
    image: '/food/burger.png',
    prepTime: '10 min',
    cookTime: '20 min',
    difficulty: 'Advanced',
    greaseFireCount: 1,
    yumminess: 37,
    ingredients: [
      '1 / 2 cup Heinz Tomato Ketchup',
      '1 Tbsp.chili powder',
      '2 Tbsp.Heinz 57 Sauce Original',
      '1 Tbsp.Lea & Perrins Worcestershire Sauce',
      '1 / 2 tsp.each dried oregano leaves and ground cumin',
      '1 lb. (450 g) extra - lean ground beef',
      '1 / 3 cup fresh bread crumbs',
      '1 egg, beaten',
      '4 Cracker Barrel Monterey Jack with Jalapeno Natural Cheese Slices',
      '4 onion sandwich buns',
      '1 beefsteak tomato, cut into 4 slices'
    ],
    instructions: [
      'Heat greased barbecue to medium heat.',
      'Mix ketchup, 57 sauce, Worcestershire sauce and dry seasonings in large bowl until blended. Remove half the ketchup mixture; reserve for later use.Add meat, bread crumbs and egg to remaining ketchup mixture; mix just until blended, Shape into 4(1/ 2 - inch - thick) patties.',
      'Grill 3 min.on each side.Remove half the reserved ketchup mixture; set aside. Brush burgers with remaining ketchup mixture.Grill 5 min.or until done(160ºF), turning and brushing with reserved ketchup mixture after 3 min.',
      'Top burgers with cheese; place buns, cut sides down, on barbecue grate.Grill 1 min. or until cheese is melted and buns are lightly toasted.',
      'Place cheeseburgers on bottom halves of buns; top with tomatoes.Cover with tops of buns.'
    ]
  },
  {
    name: 'Grilled Cheese',
    date: '4/09/2019',
    cookCount: 0,
    image: '/food/grilled_cheese.png',
    prepTime: '2 min',
    cookTime: '8 min',
    difficulty: 'Beginner',
    greaseFireCount: 0,
    yumminess: 44,
    ingredients: [
      '4 slices white American cheese',
      '8 slices country white bread',
      '4 slices yellow American cheese',
      'Salted butter, softened'
    ],
    instructions: [
      'Preheat the griddle to medium heat.',
      'Build the sandwiches with 1 slice of white cheese on 4 pieces of bread and 1 slice of yellow cheese on the other 4 slices of bread. Close the sandwiches and butter both sides. Place on the griddle; cover with a metal bowl and let the sandwiches get a nice golden brown, 2 to 3 minutes. Flip, cover again and cook until the cheese is melted and the sandwiches are golden brown, 2 to 3 minutes.'
    ]
  },
  {
    name: 'Lemon Squares',
    date: '3/11/2019',
    cookCount: 2,
    image: '/food/lemon_bar.png',
    prepTime: '10 min',
    cookTime: '45 min',
    difficulty: 'Beginner',
    greaseFireCount: 0,
    yumminess: 50,
    ingredients: [
      '1 cup all - purpose flour',
      '1 / 2 cup butter, softened',
      "1 / 4 cup confectioners' sugar",
      '2 large eggs',
      '1 cup sugar',
      '2 tablespoons all - purpose flour',
      '1 / 2 teaspoon baking powder',
      '2 tablespoons lemon juice',
      '1 teaspoon grated lemon zest',
      "Additional confectioners' sugar"
    ],
    instructions: [
      "In a bowl, combine the flour, butter and confectioners' sugar. Pat into an ungreased 8-in. square baking pan. Bake at 350° for 20 minutes.",
      "For filling, in a small bowl, beat eggs.Add the sugar, flour, baking powder, lemon juice and zest; beat until frothy.Pour over the crust.Bake 25 minutes longer or until light golden brown.Cool on a wire rack.Dust with confectioners' sugar. Cut into bars."
    ]
  },
  {
    name: 'Kale Salad',
    date: '3/22/2019',
    cookCount: 2,
    image: '/food/kale_salad.png',
    prepTime: '10 min',
    cookTime: '0 min',
    difficulty: 'Intermediate',
    greaseFireCount: 0,
    yumminess: 50,
    ingredients: [
      '1 large bunch about 10 ounces or 3 - 4 cups kale leaves, finely chopped',
      '1 pint cherry or grape tomatoes halved',
      '1 cucumber seeded and diced',
      '1 / 2 red onion thinly sliced',
      '1 / 2 cup crumbled feta cheese',
      '1 / 2 cup extra virgin olive oil',
      '1 / 4 cup lemon juice',
      '1 garlic clove minced',
      '1 teaspoon dried oregano',
      'Salt and pepper to taste'
    ],
    instructions: [
      'To make the dressing:In a small to medium mixing bowl, combine olive oil, lemon juice, garlic, oregano, salt, and pepper. Whisk until combined.',
      'To make the salad: Combine all the chopped ingredients in a large bowl, pour dressing over salad and mix.Sprinkle with extra feta cheese before serving.',
      'Prepared and dressed salad can be stored in the fridge for up to 48 hours.'
    ]
  },
  {
    name: 'Trail Mix',
    date: '3/22/2019',
    cookCount: 0,
    image: '/food/trail_mix.png',
    prepTime: '10 min',
    cookTime: '0 min',
    difficulty: 'Intermediate',
    greaseFireCount: 0,
    yumminess: 50,
    ingredients: [
      '1 cup raw almonds (I use raw activated almonds)',
      '3 / 4 cup raw cashews',
      '5 raw brazil nuts, rough chopped',
      '2 / 3 cup raw pumpkin seeds',
      '1 / 3 cup raw sunflower seeds',
      '2 / 3 cup air popped popcorn(no oil or salt added)',
      '2 tablespoons unsweetened dried cranberries, chopped',
      '2 tablespoons vegan dark chocolate chips',
      'sea salt'
    ],
    instructions: [
      'Chop any large ingredients if necessary to make everything about the same size.',
      'Give the dried fruit a light sprinkle of sea salt before you mix it in (it sticks better), or sprinkle the whole mix with salt if you prefer.',
      'Combine all ingredients in a bowl and enjoy!',
      'Store in an airtight container for up to 2 weeks.'
    ]
  }
];

export default data;
