import React, {useState, useEffect} from 'react';
import Aux from '../../hoc/Aux';


function ItemDetails({match}){
    useEffect(()=>{
        fetchItem();
    },[]);

    const [item, setItem] = useState({});

    const fetchItem = async () =>{
        const fetchItem = await fetch(`http://localhost:3001/api/v1/deals/${match.params.id}`);
        const item = await fetchItem.json();
        setItem(item)
    }

    const style ={
        padding:'50px',
        textAlign: 'center'
    }
return (
    <Aux>
        <div className="" style={style}>
            <h1>{item.title}</h1>
            <h2>{item.price}</h2>
            <p>{item.description}</p>
        </div>

    </Aux>
);
  
};

export default ItemDetails;