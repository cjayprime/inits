import React, {useState, useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import AdminTable from './AdminTable';
import { Picker, Emoji } from 'emoji-mart';

const styles = {
  inputText: {height: 30, padding: 5, paddingLeft: 10, border: 0, borderRadius: 10, margin: 10, width: '70%', fontSize: 20},
  btnStyles: {width: 'auto', border: 0, padding: 7, borderRadius: 5, fontSize: 18, marginTop: 10, cursor: 'pointer', float: 'right'}
};

function Admin(props) {

  const store = props.store;
  const [view, setView] = useState('categories');
  const [mode, setMode] = useState('add');
  const [id, setID] = useState(0);
  const [title, setTitle] = useState('');
  const [category_id, setCategoryID] = useState('All');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [emoji, setEmoji] = useState('');
  const submit = () => {

    if(mode === 'edit'){
      
      if(view === 'listings')store.listing.edit({id, category_id, name, description, url, email, mobile, address});
      if(view === 'categories')store.category.edit({category_id, title: categoryTitle, emoji});

    }else if(mode === 'add'){

      if(view === 'listings'){
        
        var category = 0;
        store.listings.map((v) => {
          if(v.title.toLowerCase() === title.toLowerCase())
          category = v.category_id;

          return null;
        });

        if(category === 0){
          alert('Choose a category first.')
        }else
          store.listing.add({id, category_id: category, name, description, url, email, mobile, address});
      
      }else if(view === 'categories'){
        
        var found = false;
        store.categories.map((v) => {
          if(v.title.toLowerCase() === categoryTitle.toLowerCase())
          found = true

          return null;
        });

        if(found){
          alert('A category with this title alreay exists.')
        }else
        store.category.add({title: categoryTitle, emoji});
      
      }
      
    }

  };
  const updateForm = (data) => {

    if(view === 'listings'){

      var {id, title, category_id, name, description, url, email, mobile, address} = data;

      setID(id);
      setTitle(title);
      setCategoryID(category_id);
      setName(name);
      setDescription(description);
      setUrl(url);
      setEmail(email);
      setMobile(mobile);
      setAddress(address);
    
    }else{

      setCategoryID(data.category_id);
      setCategoryTitle(data.title);
      setEmoji(typeof data.emojiText === 'string' ? data.emojiText : data.emoji);
      console.log(data.emoji)

    }

  };

  useEffect(() => {

    store.loadCategories();
    store.loadListings('all');

  }, [store, name]);

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', position: 'fixed', height: '100%', width: '35%', color: '#F7FDFD', background: '#172432', marginTop: -2}}>
          <marquee style={{float: 'left'}}>To add a new listing, first choose a category</marquee>
          <div style={{display: 'flex', flexDirection: 'column', marginTop: 75, alignItems: 'center'}}>
            
            {view === 'listings' ?
              <>

                <input type="hidden" value={id} onChange={(e) => setID(e.target.value)} />
                
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%'}}>
                  {
                    <select value={title} style={{height:30, fontSize: 15, borderRadius: 15, border: 0, padding: 5}} onChange={(e) => {
                      //If category is ever changed you are automatically adding
                      setTitle(e.target.value);
                      setMode('add');
                    }}>
                      <option>Choose the category</option>
                      {
                        store.categories.map((v, i) => { 
                            if(v.title.toLowerCase() !== 'all'){
                              return (<option key={i}>{v.title}</option>);
                            }else return null;
                          }
                        )
                      }
                    </select>
                  }

                  <input type="button" style={styles.btnStyles} value={mode.split('')[0].toUpperCase() + '' + mode.substr(1)} onClick={submit} onSubmit={submit} />
                </div>
                
                <input type="text" style={styles.inputText} placeholder="Business Name" value={name} onChange={(e) => setName(e.target.value)} />
                
                <input type="text" style={styles.inputText} placeholder="Business Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                
                <input type="file" placeholder="Images" onChange={(e) => {
                  setName(e.target.value)
                
                }} />
                
                <div>
                  <div></div>
                  <div></div>
                </div>
                
                <input type="text" style={styles.inputText} placeholder="Business Website" value={url} onChange={(e) => setUrl(e.target.value)} />
                
                <input type="text" style={styles.inputText} placeholder="Business Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <input type="text" style={styles.inputText} placeholder="Business Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                
                <input type="text" style={styles.inputText} placeholder="Business Address" value={address} onChange={(e) => setAddress(e.target.value)} />

              </>

            :
            
              <>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'end', justifyContent: 'flex-end', marginRight: '27%', width: '100%'}}>
                <input type="button" style={styles.btnStyles} value={mode.split('')[0].toUpperCase() + '' + mode.substr(1)} onClick={submit} onSubmit={submit} />
              </div>
              
              <input type="hidden" value={category_id} onChange={(e) => setCategoryID(e.target.value)} />

              <input type="text" style={styles.inputText} placeholder="Category Title" value={categoryTitle} onChange={(e) => {
                
                setCategoryTitle(e.target.value);
              
              }} />

              <div style={styles.inputText}>
                <Emoji emoji={{ id: emoji, skin: 2 }} size={32}  backgroundImageFn={()=>'../images/emoji.png'} />
              </div>

              <div style={{display: 'flex', justifyContent: 'center', width: '99%', height: 400, overflow: 'hidden', background: '', overflowX: 'hidden', overflowY: 'hidden'}}>
                <Picker title="Inits Emoji" set="apple" style={{width: '70%'}} backgroundImageFn={()=>'../images/emoji.png'} onSelect={(e) => {
                  
                  setEmoji(e.id);
                
                }} />
              </div>

              </>
            }
          </div>
      </div>
      <div style={{marginLeft: '35%', width: '65%', height: '100%', background: '#F7FDFD', marginTop: -2}}>
        <AdminTable changeMode={setMode} view={view} changeView={setView} updateForm={updateForm}/>
      </div>
    </>
  );
}

export default inject('store')(observer(Admin));