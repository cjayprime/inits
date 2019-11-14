import React, {useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Emoji } from 'emoji-mart';

function SideMenu(props){

    const store = props.store;
    const categories = store.categories;

    useEffect(() => {

        store.loadCategories();

    }, [store]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', position: 'fixed', height: '100%', width: '15%', color: '#F7FDFD', background: '#172432', marginTop: -2}}>
            <header style={{display: 'flex', flexShrink: 0, justifyContent: 'center', alignItems: 'center', height: 75, background: '#55CAB5', fontSize: 25}}>
                <img alt="logo" src="../images/logo.png" style={{width: '60%'}} />
            </header>
            
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: 20, color: '#79838D', overflow: 'auto', borderRight: '2px solid #172432'}}>
                {
                    categories.map((v, i) => {

                        var isActive = (v.title.toLowerCase() === props.active.toLowerCase()) ? <span style={{backgroundColor: '#55CAB5', borderRadius: 10, minWidth: 40, textAlign: 'center', color: '#FFF', fontSize: 11, marginLeft: 10}}>{store.count}</span> : null;

                        return (
                            <Link style={{color: '#79838D', textDecoration: 'none'}} key={i} to={"/category/" + v.title.toLowerCase()}>
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginTop: 30, cursor: 'pointer'}}>
                                    <span>{v.title}</span>
                                    {isActive}
                                    <div style={{position: 'absolute', right: 20}}>
                                        <Emoji emoji={{ id: v.emoji, skin: 2 }} size={15} backgroundImageFn={()=>'../images/emoji.png'} />
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                }
                <Link style={{color: '#79838D', textDecoration: 'none', position: 'absolute', bottom: 10}} to={"/admin"}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginTop: 30, cursor: 'pointer'}}>
                        <span>Admin</span>
                    </div>
                </Link>
            </div>
        </div>
    );

}

export default inject('store')(observer(SideMenu));