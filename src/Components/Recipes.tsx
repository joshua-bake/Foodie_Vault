import axios from 'axios';
import { useEffect, useState } from 'react';

interface IRecipes {
    id: number,
    title: string,
    image: string,
    summary: string,
    cookingTime: number,
    dishType: string,
    servings: number,
}


const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
    params: {
        query: 'baked chicken',
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

// try {
//     const response = await axios.request(options);
//     console.log(response.data);
// } catch (error) {
//     console.error(error);
// }





const products = [
    {
        id: 1,
        name: 'Earthen Bottle',
        href: '#',
        price: '$48',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 2,
        name: 'Nomad Tumbler',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 3,
        name: 'Focus Paper Refill',
        href: '#',
        price: '$89',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    // More products...
]

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
            return library.title.toLowerCase().includes(search.toLowerCase()) ||
                library.cookingTime.toString().includes(search);
        });
    }



    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {recipes.map((library) => (
                        <a key={library.title} href={library.title} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    alt={library.title}
                                    src={library.image}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{library.title}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{library.summary}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
