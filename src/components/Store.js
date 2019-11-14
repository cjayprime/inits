import {decorate, observable/*, action*/} from 'mobx';

class Store {
	

    categories = [{title: 'All', emoji: 'male-technologist'}];

    listings = [];

    count = 0;

    //baseUrl = 'http://localhost/projects/work/ongoing/inits/api/';
    baseUrl = 'http://www.nnachijioke.byethost14.com/';
    

    fetchAPI = (url, callback, data) => {

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        
        var query = {method: data ? 'post' : 'get'};
        var formData = new FormData();
        for ( var key in data ) {
            formData.append(key, data[key]);
        }
        if(data)query.body = formData;

        fetch(this.baseUrl + '' + url, query)
        //.then(async response => {console.log(response.type, response.body, await response.text()); return response})
        .then((response) => {
            
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
            } else {
                var error = new Error(response.statusText || response.status);
                error.response = response;
                return Promise.reject(error)
            }

        })
        .then(response => response.json())
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
            this.listingAction('/')
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
            this.categoryAction('/')
        }
    };

}

decorate(Store, {
	categories: observable,
	category: observable,
	listings: observable,
	count: observable,
	fetchAPI: observable
})

const store = new Store();

export default store;
