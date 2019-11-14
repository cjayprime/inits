import React, {useState, useEffect} from 'react';
import SideMenu from './SideMenu';
import Listing from './Listing';
import { inject, observer } from 'mobx-react';

function Index(props) {

    const store = props.store;
    const name = props.match.params.name;
    const [listings, setListings] = useState([]);

    useEffect(() => {
        
        store.loadListings(name, setListings);

    }, [name, store]);

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <SideMenu active={name} />
            <Listing active={name} listings={listings}/>
        </div>
    );
}

export default inject('store')(observer(Index));
