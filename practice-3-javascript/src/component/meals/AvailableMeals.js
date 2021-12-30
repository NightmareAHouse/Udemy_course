import classes from '../../css/AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from "./mealItem/MealItem";
import {useEffect, useState} from 'react';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://udemy-practice-3-default-rtdb.firebaseio.com/meals.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedMeals = [];

            console.log(responseData);

            for (const key in responseData) {
                console.log(responseData[key].description)
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        }


        fetchMeals().catch(error => {
            setIsLoading(false);
            setError(error.message)
        });
    }, []);

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }

    if (error) {
        return (
            <section className={classes.MealsError}>
                <p>{error}</p>
            </section>
        )
    }

    const mealsList = meals.map(meal =>
        <li>
            <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        </li>);

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
};

export default AvailableMeals;