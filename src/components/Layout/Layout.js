import React from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Toolbar/Toolbar';


const layout = (props) => (
    <Aux>
            <Toolbar email={props.email}/>
    </Aux>
);
//render={(props) => <BestDeals email={props.email}/> }
export default layout;