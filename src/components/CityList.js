import { useState } from 'react';

function CityList({setQuery}) {
    const cities = [
        {
            id:1,
            title: 'ottawa',
        },
        {
            id:2,
            title: 'moscow',
        },
        {
            id:3,
            title: 'tokyo',
        }
    ]

    const [displayCity, setDisplayCity] = useState(1);

    const handleClick = (id) => {
        setDisplayCity(id);
    }

    return (
        <div className="cities-wrapper">
            {cities.map((city) => (
                <button key={city.id} 
                        onClick={() => {setQuery({ q: city.title }); handleClick(city.id)}}
                        className={ displayCity === city.id? 'city active' : 'city'}
                        >
                    {city.title}
                </button>
            ))}
        </div>
    )
}

export default CityList;