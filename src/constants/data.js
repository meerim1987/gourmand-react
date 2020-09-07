export const MenuCategories_short = [
  { category: 'soup', url: 'bacon-and-beef-stew.jpg' },
  { category: 'dessert', url: 'dessert-ete-tarte-2-1.jpg' },
  { category: 'salad', url: 'thaicherrysalad2.jpg' },
];

export const MenuItems = [
  { label: 'Home', url: '/' },
  { label: 'Categories', url: '/categories/' },
  { label: 'Post Recipe', url: '/recipe-post' },
];

export const FooterItems = [
  { label: 'About', url: '/about' },
  { label: 'Home', url: '/' },
  { label: 'Categories', url: '/categories/' },
  { label: 'Contact', url: '/contact' },
];

export const SliderOfPictures = [
  {
    label: 'Spinach Pomegranate Salad',
    url: 'assets/images/salad_slide.jpg',
    category: 'salad',
    recipeId: 3,
    intro: 'Pomegranate seeds and walnuts add extra antioxidant power to this seriously nutritious—and delicious—salad',
  },
  {
    label: 'Tiramisu Cheesecake',
    url: 'assets/images/tiramisu_slide.jpg',
    category: 'dessert',
    recipeId: 6,
    intro: 'Tiramisu cheesecake combines the flavors and richness of tiramisu and NY Cheesecake',
  },
  {
    label: 'Beef Plov (Beef Rice Kyrgyz)',
    url: 'assets/images/plov_slide.jpg',
    category: 'meat',
    recipeId: 9,
    intro:
      'Plov is a rice pilaf with meat, carrots, onions and spices, tender chunks of meat and fluffy rice with lots of aromatic flavours',
  },
  {
    label: 'Veggie Pizza',
    url: 'assets/images/pizza_slide.jpg',
    category: 'different',
    recipeId: 4,
    intro: 'It is here—a refreshing appetizer that combines vegetables AND pizza',
  },
  {
    label: 'Ukrainian Red Borscht',
    url: 'assets/images/borshct_slide.jpg',
    category: 'soup',
    recipeId: 2,
    intro:
      'With time, it evolved into a diverse array of tart soups, among which the beet-based red borscht has become the most popular',
  },
];

export const Categories = {
  salad: {
    description: `A salad is a dish consisting of a mixture of small pieces of food, usually vegetables. 
                    However, different varieties of salad may contain virtually any type of ready-to-eat food. 
                    Salads are typically served at room temperature or chilled, with notable exceptions such as south German potato salad which is served warm.`,
    label: 'Salads',
  },
  meat: {
    description:
      'Take some care and attention when cooking with meat- whether slow-roasting a joint or flash frying a steak.',
    label: 'Meats',
  },
  soup: {
    description: `Soup is a primarily liquid food, generally served warm or hot, that is made by combining ingredients of meat or vegetables with stock, or water. 
                    Hot soups are additionally characterized by boiling solid ingredients in liquids in a pot until the flavors are extracted, forming a broth.`,
    label: 'Soups',
  },
  dessert: {
    description: `Dessert is a course that concludes an evening meal. 
                    The course usually consists of sweet foods, such as confections dishes or fruit, 
                    and possibly a beverage such as dessert wine or liqueur, however in the United States it may include coffee, cheeses, nuts, or other savory items regarded as a separate course elsewhere.`,
    label: 'Desserts',
  },
  different: {
    description: 'Here you can find any recipes not belonging to any other afore-mentioned category.',
    label: 'Different',
  },
};

export const PersonalData = {
  userAvatar: 'assets/images/photo_me.jpg',
  fullName: 'Meerim Oboskanova',
  summary: 'I am Meerim Oboskanova. I love to code, different food, but most of all life  ',
  linkedIn: 'https://www.linkedin.com/in/meerim-oboskanova-ab59769/',
  occupation:
    'Frontend sofware developer and the culinary amateur.',
};
