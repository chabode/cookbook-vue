# Cook Book 
Creating Cook book for yourself and generate a random recipe to your book from themealdb.com
- with express, sequelize, postgres, bcrypt and jsonwebtoken in server
- using vue, css and html in client
Additional API: Google Sign In, themealdb.com

## RESTful Endpoints

### POST /register
> Register new user

_Request Header_
```
None
```

_Request Body_
```
{
    "email" : <email to insert here>,
    "password" : <password to insert here>
}
```
_Response (201)_
```
{
    "message" : "new email has been registered"
}
```
_Response (500)_
```
{
    "message" : "Invalid Email Or Password"
}
```

### POST /login
> Login user

_Request Header_
```
None
```

_Request Body_
```
{
    "email" : <email to insert here>,
    "password" : <password to insert here>
}
```
_Response (200)_
```
{
    "access_token" : <your private access token>,
    "email" : <your registered email>
}
```
_Response (400)_
```
{
    "message" : "Invalid Email Or Password"
}
```
_Response (500)_
```
{
    "message" : "Internal Server Error"
}
```
### POST /googleSignIn
> Login user

_Request Header_
```
None
```

_Request Body_
```
{
    "id_token" : <generated google token>
}
```
_Response (200)_
```
{
    "access_token" : <your private access token>,
    "email" : <your registered google email>
}
```
_Response (400)_
```
{
    "message" : "Invalid Token"
}
```
_Response (500)_
```
{
    "message" : "Internal Server Error"
}
```

### GET /recipe
> Get all recipe in database

_Request Header_
```
Not needed
```

_Request Body_
```
Not Needed
```

_Response (200)_
```
[
    {
        "id" : 1,
        "meal" : <your meal name>,
        "category" : <your meal category>,
        "instructions" : <registered meal instructions>,
        "image" : <registered url image>,
        "UserId" : <registered id user who make it>
        "createdAt" : "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    },
    {
        "id" : 2,
        "title" : <your task name>,
        "description" : <your task category>,
        "status" : <registered user id>,
        "createdAt" : "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }
]
```
_Response (500)_
```
{
    "message" : "Internal Server Error"
}
```

### POST /recipe
> Create new recipe

_Request Header_
```
Not needed
```

_Request Body_
```
{
    "meal" : <title to get insert into>,
    "category" : <category to get insert into>,
    "instructions" : <your instructions to insert>,
    "image" : <your image link to insert>
}
```

_Response (201 - created)_
```
[
    {
        "id" : <given by sistem>,
        "meal" : <posted meal name>,
        "category" : <posted category>,
        "instructions" : <posted instructions>,
        "image" : <posted image url>,
        "createdAt" : "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }
]
```

_Response (400 - Bad Request)_
```
{
    "message" : "<error message>"
}
```

### DELETE /task/:id
> Delete todo from certain id

_Request Header_
```
{
    "access_token" = "<your access token>"
}
```

_Request Body_
```
{
    "id" : <your designated id todo>,
}
```

_Response (200)_
```
[
    {
        "message" : "data has been deleted"
    }
]
```
_Response (403)_
```
{
    "message" : "Forbidden Access"
}
```
_Response (404)_
```
{
    "message" : "<data not found>"
}
```
_Response (500)_
```
{
    "message" : "<error message>"
}
```

### GET /food
> Get random food from themealdb API

_Request Header_
```
Not needed
```

_Request Body_
```
Not needed
```
_Response (200)_
```
{
    "data":{
        "idMeal":"52860",
        "strMeal":"Chocolate Raspberry Brownies",
        "strDrinkAlternate":null,
        "strCategory":"Dessert",
        "strArea":"American",
        "strInstructions":"Heat oven to 180C/160C fan/gas 4. Line a 20 x 30cm baking tray tin with baking parchment. Put the chocolate, butter and sugar in a pan and gently melt, stirring occasionally with a wooden spoon. Remove from the heat.\r\nStir the eggs, one by one, into the melted chocolate mixture. Sieve over the flour and cocoa, and stir in. Stir in half the raspberries, scrape into the tray, then scatter over the remaining raspberries. Bake on the middle shelf for 30 mins or, if you prefer a firmer texture, for 5 mins more. Cool before slicing into squares. Store in an airtight container for up to 3 days.",
        "strMealThumb":"https://www.themealdb.com/images/media/meals/yypvst1511386427.jpg",
        "strTags":"Chocolate,Desert,Snack",
        "strYoutube":"https://www.youtube.com/watch?v=Pi89PqsAaAg",
        "strIngredient1":"Dark Chocolate",
        "strIngredient2":"Milk Chocolate",
        "strIngredient3":"Salted Butter",
        "strIngredient4":"Light Brown Soft Sugar",
        "strIngredient5":"Eggs",
        "strIngredient6":"Plain Flour",
        "strIngredient7":"Cocoa",
        "strIngredient8":"Raspberries",
        "strIngredient9":"",
        "strIngredient10":"",
        "strIngredient11":"",
        "strIngredient12":"",
        "strIngredient13":"",
        "strIngredient14":"",
        "strIngredient15":"",
        "strIngredient16":"",
        "strIngredient17":"",
        "strIngredient18":"",
        "strIngredient19":"",
        "strIngredient20":"",
        "strMeasure1":"200g",
        "strMeasure2":"100g",
        "strMeasure3":"250g",
        "strMeasure4":"400g",
        "strMeasure5":"4 large",
        "strMeasure6":"140g",
        "strMeasure7":"50g",
        "strMeasure8":"200g",
        "strMeasure9":"",
        "strMeasure10":"",
        "strMeasure11":"",
        "strMeasure12":"",
        "strMeasure13":"",
        "strMeasure14":"",
        "strMeasure15":"",
        "strMeasure16":"",
        "strMeasure17":"",
        "strMeasure18":"",
        "strMeasure19":"",
        "strMeasure20":"",
        "strSource":"https://www.bbcgoodfood.com/recipes/2121648/bestever-chocolate-raspberry-brownies",
        "dateModified":null
    }
}
```

_Response (500)_
```
{
    "message" : "Internal Server Error"
}
```