import axios from 'axios';
import { useEffect, useState } from 'react';
import { IRecipes } from '../Interfaces/Recipes';

//! Styling for search bar, increase width of columns, fix Home page. Add Login and Signup pages...


const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
    params: {
        query: '',
        instructionsRequired: 'true',
        fillIngredients: 'false',
        addRecipeInformation: 'true',
        addRecipeInstructions: 'true',
        addRecipeNutrition: 'false',
        maxReadyTime: '45',
        ignorePantry: 'true',
        sort: 'max-used-ingredients',
        offset: '0',
        number: '10'
    },
    headers: {
        'x-rapidapi-key': 'd6e0ddd751msh325fe185ba8cfb9p141aefjsn024b153f64e2',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
};


export default function Recipes() {

    const [recipes, setRecipes] = useState<IRecipes[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await axios.request(options);
                console.log(response.data);
                const recipes = response.data.results;
                setRecipes(recipes)
            } catch (error) {
                console.error(error);
            }

        } fetchRecipes()
    }, [])

    for (let key in recipes) {
        console.log('Here are the recipes', recipes[key])
    }
    recipes.forEach(function (library) {
        console.log(library.title)
    })

    function unifiedSearch() {
        return recipes.filter((library) => {
            return library.title.toLowerCase().includes(search.toLowerCase())
            // library.cookingTime.toString().includes(search.toString());
        });
    }

    function handleChange(e: any) {
        setSearch(e.currentTarget.value)
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-3 text-center">Recipe Vault</h2>
                <input className='input py-4 text-center w-full' placeholder='Search Recipes' onChange={handleChange} value={search} />
                <div className="pt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:w-full xl:gap-x-8">
                    {unifiedSearch().map((library) => (
                        <a key={library.title} href={library.title} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    alt={library.title}
                                    src={library.image}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="px-3 mt-4 text-xl font-bold text-gray-700">{library.title}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{library.summary}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
