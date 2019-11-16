import React, { useState, useEffect } from 'react';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import MaterialTable from 'material-table';
import { Emoji } from 'emoji-mart';


const styles = {
    outerImageContainer: {display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', height: 65, width: 150, padding: 10, background: 'grey', margin: 5, borderRadius: 10, overflowY: 'auto', marginLeft: -25},
    
    innerImageContainer: {height: 30, width: 30, marginBottom: 15, margin: 5, background: 'grey', position: 'relative', overflow: 'hidden', backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: ''}
};
//var styleImageContainer = {display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', height: 65, width: 150, padding: 10, background: 'grey', margin: 5, borderRadius: 10, overflowY: 'auto', marginLeft: -25};
//var styleDiv = {height: 30, width: 30, marginBottom: 15, margin: 5, background: 'grey', position: 'relative', overflow: 'hidden', backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: 'url("' + v + '")'};
            
const Table = (props) => {
    
    const dataPanel = {
        columns: [
            {
            field: 'id',
            title: 'Business ID',
            hidden: true
            },
            {
            field: 'title',
            title: 'Business Category',
            hidden: true
            },
            {
            field: 'category_id',
            title: 'Business Category',
            hidden: true
            },
            {
            field: 'image',
            title: 'Business Images',
            hidden: true,
            },
            {
            field: 'name',
			title: 'Business Name'
            },
            {
            field: 'description',
			title: 'Business Description'
            },
            {
            field: 'imageView',
            title: 'Business Images'
            },
            {
            field: 'url',
			title: 'Business Url'
            },
            {
            field: 'email',
			title: 'Business Email'
            },
            {
            field: 'mobile',
			title: 'Business Mobile Contact'
            },
            {
            field: 'address',
			title: 'Business Address'
            }
        ],
        rows: []
    };
    const store = props.store;
    const [panel, setPanel] = useState(dataPanel);
    const switchListing = () => {
        
        panel.columns = dataPanel.columns;
        panel.rows = [];

        store.listings.map((v) => {
            
            var img = [];
            v.image.map((v,i) => {
                
                styles.innerImageContainer.backgroundImage = 'url(' + v + ')';

                return img.push(<div style={JSON.parse(JSON.stringify(styles.innerImageContainer))} key={i} />);
            
            });

            panel.rows.push({
                id: v.id,
                title: v.title,
                category_id: v.category_id,
                image: v.image,
                imageView: <div style={styles.outerImageContainer}>{img}</div>,
                name: v.name,
                description: v.description,
                url: v.url,
                email: v.email,
                mobile: v.mobile,
                address: v.address
            });

            return null;
        });

        setPanel(panel);
    };
    const switchCategories = () => {
        
        panel.columns = [{
                field: 'title',
                title: 'Category Title'
            },{
                field: 'emoji',
                title: 'Category Emoji'
            },{
                field: 'emojiText',
                title: 'Category Emoji',
                hidden: true
            }
        ];
        panel.rows = [];
        
        store.categories.map((v) => {
            if(v.title !== 'All')
            panel.rows.push({
                category_id: v.category_id,
                title: v.title,
                emoji: <Emoji emoji={{ id: v.emoji, skin: 2 }} size={15}  backgroundImageFn={()=>'../images/emoji.png'} />,
                emojiText: v.emoji
            });

            return null;
        });

        setPanel(panel);
    };
    
    useEffect(() => {

        return autorun(() => {

            if(props.view === 'listings'){
                switchListing();
            }else{
                switchCategories();
            }
            
        });

    });

    //I just had to use store.listings otherwise useEffects didn't run
    return(

        <>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', margin: 10, marginRight: 20}}>
                <span style={{fontSize: 30}}>View</span><br/>
                <select value={props.view} style={{height: 30, fontSize: 15, border: 0}} onChange={(e) => {
                    props.changeView(e.target.value);
                    if(e.target.value === 'listings')switchListing();
                    if(e.target.value === 'categories')switchCategories();
                }}>
                    <option value="listings">Listing</option>
                    <option value="categories">Category</option>
                </select>
            </div>
            {
            ((store.listings.length && props.view === 'listings')
            ||
            (store.categories.length && props.view === 'categories'))
            ?
            <MaterialTable
            title={'All ' + props.view}
            columns={panel.columns}
            data={panel.rows}      
            actions={[
                {
                    icon: 'mode_edit',
                    tooltip: 'Edit business',
                    onClick: (event, rowData) => {

                        props.changeMode('edit');
                        props.updateForm(rowData);

                    }
                },
                {
                    icon: 'delete',
                    tooltip: 'Delete business',
                    onClick: (event, rowData) => {

                        if(props.view === 'listings'){
                            store.listing.delete({id: rowData.id});
                        }else{
                            store.category.delete({id: rowData.category_id});
                        }

                    }
                }
            ]}
            />
            :
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gridGap: 40, padding: 40}}>
                <img alt="Not found" src="../images/notfound.gif" style={{height: '85%', margin: 'auto', textAlign: 'center'}} />
            </div>
            }
        </>
        
    );
};

export default inject('store')(observer(Table));