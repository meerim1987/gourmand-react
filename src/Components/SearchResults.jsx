import React, { memo } from 'react';
import { Link } from 'react-router-dom';


export const SearchResults = memo(({data, searchItem}) => {
    return (
        <ul className="search-results-cont">
            {!data.length && searchItem && <li className="empty-result">0 recipe results for "{searchItem}"</li>}
            {data.map(({title, photos, id}) => (
            <li key={id}>
                <Link to={`/recipe/${id}`}>
                    <div className="recipe-image">     
                        <img alt={`${title}-icon`} title={title} src={photos[0].photo}/>
                    </div>
                    <div className="right-col">
                        <span className="product-name">{title}</span>
                    </div>
                </Link> 
            </li>))}  
        </ul>
    )
});