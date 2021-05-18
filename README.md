# Furniture-app.github.io
This is a SPA application that i made for the SoftUni JS Applications - February 2021 course.   
I have adapted it to work with Back4App(as a REST service).

## Functionality
*  Login and register
*  Creating, editing and deleting furniture items
*  Viewing details about a certain furniture item

## Technologies
* HTML, CSS, JavaScript
* lit-html, page
* GitHub Pages, Back4app

## Views
* **Login/Regsiter** - register with email, username and password
* **Catalog - Dashboard** - list of the furniture items, created by all users
* **Create item** - registered users can create furniture items
* **Edit item** - only the owner(creator) of the item can edit it
* **Furniture Details** - additional description about a certain furniture item
* **My Furniture Page** - list of the furniture items, created by the current user

### Structure
#### Classes
* Sessions
* Users
```javascript
{
    email: String,
    username: String,
    password: String
}
```
* Furniture
```javascript
{
  make: String,
  model: String,
  year: Number,
  description: String,
  price: Number,
  img: String,
  material: String,
}
```

#### CLP(Class Level Permissions)
* Guest users can register, view the catalog and the furniture details 
* Registered users can create furniture and view the furniture they have created(aswell as the catalog)
* Only the creator of a given item can edit and delete it
