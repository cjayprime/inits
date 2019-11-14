import React, {useState, useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import Map from './Map';
import { Emoji } from 'emoji-mart';

const listStyles = {
    position:           'relative',
    backgroundImage:    'url("")',
    borderRadius:       5,
    maxWidth:           180,
    height:             225,
    marginTop:          2.5,
    marginBottom:       2.5,
    boxShadow:          'rgba(0, 0, 0, 0.3) 0px -1px 12px 0px, rgba(0, 0, 0, 0.22) 0px 2px 12px',
    overflow:           'hidden',
    cursor:             'pointer',
    backgroundPosition: 'center center',
    backgroundSize:     'cover',
    backgroundRepeat:   'no-repeat'
};

function Listing(props){

    const store = props.store;
    const name = props.active;
    const [search, setSearch] = useState('');
    const [listings, setListings] = useState(props.listings);
    const [empty, setEmpty] = useState(true);

    useEffect(() => {

        setSearch('');
        setListings(props.listings);
        setEmpty(props.listings.length > 0 ? false : true);

    }, [props.listings]);

    return (
        <div style={{marginLeft: '15%', width: '85%', background: '#F7FDFD', marginTop: -2}}>
            <header style={{position: 'fixed', width: '85%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 75, zIndex: 100000000, boxShadow: listStyles.boxShadow}}>
                
                <input id="search-bar" type="text" style={{color: '#000', width: '100%', height: 70, fontSize: 40, border: 0, paddingLeft: 10, paddingRight: 10}} placeholder="Search..." value={search} onChange={(e)=>{
                    
                    var value = e.target.value;
                    store.fetchAPI('search?query=' + value + '&category=' + name, (response) => {
            
                        if (response.status === true) {
                            props.store.count = response.data.length;
                            setListings(response.data);
                            setEmpty(false);
                        }else{
                            props.store.count = 0;
                            setListings([]);
                            setEmpty(true);
                        }
            
                    });
                    setSearch(value);

                }} />
            
            </header>

            <div style={{background: '#F7FDFD', fontSize: 13, color: '#555', paddingLeft: 10, marginTop: 85}}>
                We found {store.count === 0 ? 'no' : store.count} {store.count === 1 ? 'result' : 'results'} in this category
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gridGap: 40, padding: 40}}>

                {
                    !empty
                    ?
                        listings.length
                        ?
                            listings.map((v, i) => {
                                
                                listStyles.backgroundImage = 'url("' + v.image[0] + '")';

                                return (
                                <div key={i} style={JSON.parse(JSON.stringify(listStyles))}>
                                    <div className="category-label" style={{display: 'flex', alignItems: 'center', padding: 5, paddingLeft: 15, paddingRight: 15, height: 20, borderRadius: 15, margin: 10, fontSize: 12, background: '#000', opacity: 0.5, color: '#FFF', position: 'absolute'}}>
                                        <Emoji emoji={{ id: v.emoji, skin: 2 }} size={15} backgroundImageFn={()=>'../images/emoji.png'} />
                                        <span style={{marginLeft: 10}}>
                                            {v.title.split('')[0].toUpperCase() + '' + v.title.substr(1)}
                                        </span>
                                    </div>
                                    <div className="title" style={{position: 'absolute', bottom: 0, width: '100%', height: 'auto', padding: 2.5, paddingBottom: 10, paddingLeft: 10, color: '#FFF', boxShadow: 'rgba(0, 0, 0, 1) 0px -6px 12px 0px inset'}}>
                                        <div className="name" style={{fontSize: 17}}>{v.name}</div>
                                        <div className="address" style={{fontSize: 11}}>{v.address}</div>
                                    </div>
                                </div>)
                            })
                        :
                            null
                    :
                    <img alt="Not found" src="../images/notfound.gif" style={{height: '85%', margin: 'auto', textAlign: 'center'}} />
                }

            </div>
            
            <Map>A big</Map>
        </div>
    );
}

export default inject('store')(observer(Listing));