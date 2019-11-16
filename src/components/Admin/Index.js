/**
 * 
 * 
 * Validate all entries
 * 
 * 
 */


import React, {useState, useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import Table from './Table';
import { Picker, Emoji } from 'emoji-mart';

const styles = {
  inputText: {height: 30, padding: 5, paddingLeft: 10, border: 0, borderRadius: 10, margin: 10, width: '70%', fontSize: 20},
  btnStyles: {width: 'auto', border: 0, padding: 7, borderRadius: 5, fontSize: 18, marginTop: 10, cursor: 'pointer', float: 'right'}
};

function Admin(props) {

  const store = props.store;
  const [view, setView] = useState('listings');
  const [mode, setMode] = useState('add');
  const [id, setID] = useState(0);
  const [title, setTitle] = useState('');
  const [category_id, setCategoryID] = useState('All');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [emoji, setEmoji] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);
  const refToFileUpload = React.createRef();

  const submit = () => {

    if(mode === 'edit'){
      
      if(view === 'listings')store.listing.edit({id, category_id, name, description, image: imageFile, url, email, mobile, address});
      if(view === 'categories')store.category.edit({category_id, title: categoryTitle, emoji});

    }else if(mode === 'add'){

      if(view === 'listings'){
        
        var category = 0;
        /**
         * 
         * 
         * 
         * I am unable to select the first option when I click `Add` it throws a 'Choose category' error
         * 
         * 
         * 
         */
        store.listings.map((v) => {
          if(v.title.toLowerCase() === title.toLowerCase())
          category = v.category_id;

          return null;
        });

        if(category === 0){
          alert('Choose a category first.')
        }else
          store.listing.add({id, category_id: category, name, description, image: imageFile, url, email, mobile, address});
      
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

      var {id, title, category_id, name, description, image, imageView, url, email, mobile, address} = data;

      setID(id);
      setTitle(title);
      setCategoryID(category_id);
      setName(name);
      setDescription(description);
      setImage(image);
      setUrl(url);
      setEmail(email);
      setMobile(mobile);
      setAddress(address);
    
    }else{

      setCategoryID(data.category_id);
      setCategoryTitle(data.title);
      setEmoji(typeof data.emojiText === 'string' ? data.emojiText : data.emoji);

    }

  };

  useEffect(() => {

    store.loadCategories();
    store.loadListings('all');

  }, [store]);

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
                
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', width: '70%', height: 65, padding: 10, paddingBottom: 20, background: '#FFF', margin: 5, borderRadius: 10, overflowY: 'auto'}}>
                  <div style={{display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', position: 'relative', height: 65, width: 65, marginBottom: 35, margin: 5, overflow: 'hidden', background: 'grey', cursor: 'pointer'}} onClick={() => {
                    refToFileUpload.current.click();
                  }}>
                    <span style={{fontSize: 13}}>Select an image</span>
                    <input style={{display: 'none'}} ref={refToFileUpload} multiple type="file" placeholder="Images" onChange={(e) => {
                      
                        var files = refToFileUpload.current.files;
                        var onload = function(e){
                          image.push(e.target.result);
                          setImage(image);
                          setTimeout(() => {
                            setForceUpdate(!forceUpdate);
                          }, (i+1) * 100);
                        };

                        for(var i = 0; i < files.length; i++){

                          var file = files[i];
                          if(file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'){
                            var f = new FileReader();
                            f.readAsDataURL(file);
                            f.onload = onload;

                            imageFile.push(file);
                            setImageFile(imageFile);
                          }else console.log('A file was rejected', f.type, f.size)
                          
                        }
                    
                      }} 
                    />
                  </div>
                  {
                    image.map((v, i) => {
                      var style = {height: 65, width: 65, marginBottom: 35, margin: 5, background: 'grey', position: 'relative', overflow: 'hidden', backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: 'url("' + v + '")'};
                      return (<div key={i} style={style}>
                        <button style={{border: 0, width: '90%', cursor: 'pointer', position: 'absolute', marginLeft: '5%', bottom: 5}} 
                        onClick={() => {

                          var newImage = [];
                          image.map((v, index) => {
                            
                            if(i !== index)
                            newImage.push(v);
                            
                            return null;

                          });
                          setImage(newImage);

                          var newImageFile = [];
                          imageFile.map((v, index) => {
                            
                            if(i !== index)
                            newImageFile.push(v);
                            
                            return null;

                          });
                          setImageFile(newImageFile);
                          
                          return null;

                        }}>
                          Remove
                        </button>
                      </div>)
                    })
                  }
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
        <Table changeMode={setMode} view={view} changeView={setView} updateForm={updateForm}/>
      </div>
    </>
  );
}

export default inject('store')(observer(Admin));