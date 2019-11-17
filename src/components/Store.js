import {decorate, observable/*, action*/} from 'mobx';

class Store {
	

    categories = [{title: 'All', emoji: 'male-technologist'}];

    listings = [];

    count = 0;

    //baseUrl = 'http://localhost/projects/work/ongoing/inits/api/';
    //baseUrssssssl = ['http://localhost/projects/work/ongoing/inits/api/', 'http://www.nnachijioke.byethost14.com/'];
    baseUrl = 'http://www.nnachijioke.byethost14.com/';
    

    fetchAPI = (url, callback, data) => {

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        
        var query = {method: data ? 'post' : 'get'};
        var formData = new FormData();
        for ( var key in data ) {
            var value = key;
            if(value === 'image'){
                value = key + '[]';
                for ( var i = 0; i < data[key].length; i++ ){
                    formData.append(value, data[key][i]);
                }
            }else{
                formData.append(value, data[key]);
            }
        }
        if(data)query.body = formData;
        
        fetch(this.baseUrl + '' + url, query)
        .then((response) => {

            if (response.status >= 200 && response.status < 300) {
                
                return Promise.resolve(response)

            } else {
                
                var error = new Error(response.statusText || response.status);
                error.response = response;
                return Promise.reject(error)
            
            }

        })
        .then(async response => {
            
            var res = await response.text();
            console.log(res);
            return JSON.parse( res );
        
        })
        .then(callback)
        .catch((err) =>{
            
            console.log('Fetch Error : ', err);
        
        });
    };

    loadCategories = function(){
        
        this.fetchAPI('category/', (response) => {

            this.categories = [{title: 'All', emoji: 'male-technologist'}];
            if (response.status === true)
            response.data.map((v) => this.categories.push(v));
            
        });

    };

    loadListings = function(name, setListings = ()=>{}){
        this.fetchAPI('listing/?category=' + name, (response) => {
            
            if (response.status === true) {
                this.count = response.data.length;
                this.listings = response.data;
                setListings(response.data);
            }

        });

    };

    listingAction = function(action, data){
        
        this.fetchAPI('listing/' + action, (response) => {
            
            if (response.status === true)
            this.listings = response.data;
            
        }, data);

    };

    listing = {
        add: (data) => {
            this.listingAction('add/', data)
        },
        edit: (data) => {
            this.listingAction('edit/', data)
        },
        delete: (data) => {
            this.listingAction('delete/', data)
        },
        get: (data) => {
            this.listingAction('?category=' + data);
        }
    };

    categoryAction = function(action, data){
        
        this.fetchAPI('category/' + action, (response) => {
            
            this.categories = [{title: 'All', emoji: 'male-technologist'}];
            if (response.status === true)
            response.data.map((v) => this.categories.push(v));
            
        }, data);

    };

    category = {
        add: (data) => {
            this.categoryAction('add/', data)
        },
        edit: (data) => {
            this.categoryAction('edit/', data)
        },
        delete: (data) => {
            this.categoryAction('delete/', data)
        },
        get: (data) => {
            this.categoryAction('category/')
        }
    };

}

decorate(Store, {
	categories: observable,
	category: observable,
	listings: observable,
	count: observable,
	fetchAPI: observable,
	log: observable
})

const store = new Store();

export default store;