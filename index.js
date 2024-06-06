import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app   = express();
const port  = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";
let randomDrinks = [];
let hasRandomDrinks = false;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`server running on ${port}`);
});

app.get('/', async (req, res) => {
  console.log(`on home page /`);
  try {
    if (!hasRandomDrinks) {
      randomDrinks = []; 
      for (let i = 1; i <= 7; i++) {
        const result = await axios.get(API_URL + '/random.php');
        randomDrinks.push(result.data.drinks[0]);
      }
    };
    randomDrinks.forEach((recipe) => {
      if (recipe) {
        console.log(`idDrink`, recipe.idDrink);
      } else {
        console.log(`WTF`);
      }
    })
    res.render('index.ejs', {
      data: randomDrinks
    });
  } catch (error) {
    console.log(`error`, error.message);
    // res.status(404).send(error.message);
    // res.render('index.ejs', {
    //   content: JSON.stringify(error.response.data)
  }
})

let data;

app.post('/recipe', async (req, res) => {
  console.log(`/recipe firing`);
  const choice = req.body.choice;
  
  try {
    const result = await axios.get(API_URL + '/filter.php?i=' + choice);
    // switch ( choice ) {
    //   case "Vodka":
    //     result = await axios.get(API_URL + '/filter.php?i=' + choice);
    //     console.log(`choice is ${choice}`);
    //     break;
    //   case "Gin":
    //     result = await axios.get(API_URL + '/filter.php?i=' + choice);
    //     console.log(`choice is ${choice}`);
    //     break;
    //   case "Tequila":
    //     result = await axios.get(API_URL + '/filter.php?i=' + choice);
    //     console.log(`choice is ${choice}`);
    //     break;
    //   case "Mexcal":
    //     result = await axios.get(API_URL + '/filter.php?i=' + choice);
    //     console.log(`choice is ${choice}`);
    //     break;
    //   case "Rum":
    //     result = await axios.get(API_URL + '/filter.php?i=' + choice);
    //     console.log(`choice is ${choice}`);
    //     break;
    //   case "Brandy":
    //     result = await axios.get(API_URL + '/filter.php?i=' + choice);
    //     console.log(`choice is ${choice}`);
    //     break;
    //   case "Bourbon":
    //     result = await axios.get(API_URL + '/filter.php?i=' + choice);
    //     console.log(`choice is ${choice}`);
    //     break;
    //   case "Cognac":
    //     result = await axios.get(API_URL + '/filter.php?i=' + choice);
    //     console.log(`choice is ${choice}`);
    //     break;
    //   case "Ameratto":
    //     result = await axios.get(API_URL + '/filter.php?i=' + choice);
    //     console.log(`choice is ${choice}`);
    //     break;
    //   case "Absinthe":
    //     result = await axios.get(API_URL + '/filter.php?i=' + choice);
    //     console.log(`choice is ${choice}`);
    //     break;
    //   case "Kahlua":
    //     result = await axios.get(API_URL + '/filter.php?i=' + choice);
    //     console.log(`choice is ${choice}`);
    //     break;
    //   case "Champagne":
    //     result = await axios.get(API_URL + '/filter.php?i=' + choice);
    //     console.log(`choice is ${choice}`);
    //     break;
    //   default:
    //     break;
    // }
    const data = result.data.drinks;
    console.log(`data is`, data);
    res.render('by-spirit.ejs', { 
      data: data,
      choice: choice
    })
  } catch (error) {
    console.log(`error`, error.message);
  // res.status(404).send(error.message);
  }
})

app.post('/view-recipe', async (req, res) => {
  try {
    //console.log(`req is`, req.body.id);
    let id = req.body.id;
    console.log(`id is ${id}`);
    const result = await axios.get(API_URL + '/lookup.php?i=' + id);
    const recipe = result.data.drinks[0];
    res.render('recipe.ejs', {
      recipe: recipe
    });
  } catch (error) {
    console.log(`error`, error.message)
  }
})