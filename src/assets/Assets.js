import bread from './Bread.jpeg';
import butter from './Butter.jpeg';
import cheese from './Cheese.jpeg';
import milk from './Milk.jpeg';
import Soup from './Soup.jpeg';


export const assets = {
    bread,
    butter,
    cheese,
    milk,
    Soup,
}

export const product = [
    {
        _id : "1",
        name: 'Bread',
        price : 1.10,
        image: bread
    },
    {
        _id : "2",
        name : "Butter",
        price : 1.20,
        image : butter
    },
    { _id: "3",
     name: "Cheese",
     price: 0.90,
     image: cheese
    },
    {
        _id : "4",
        name : "Milk",
        price : 0.50,
        image : milk
    },
    {
        _id : "5",
        name : "Soup",
        price : 0.60,
        image : Soup
    }
]