# Stock market project

### Overall Tasks:
+ login/logout -- not done
	Waiting on Database changes then it will be complete
	Password needs to be hashed (Client or Server need to verify first)
	need to complete error handling blank fields or invalid inputs
	Create accounts same as above
	Pages should navigate once all is complete
+ database -- almost done
+ connecting to stock api -- not done, in testing
+ user is able to select at least 3 ticker symbols -- not done
+ user is given current price of stock -- not done
+ after all selections, divide investment equally -- not done
+ user is able to see selection data in a table -- not done, in testing
+ charts are given to the user -- not done
+ charts and table are able to be adjusted to change investment -- not done
+ running history of stocks must be saved -- not done
+ chart to allow user to see investments over time, including modified investment tables -- not done
+ the whole thing needs to look clean on a phone -- not done
+ hash the password client side "secure" -- not done

### login and logout stuff

### database
+ store at least 3 stock choices with amount purchased
+ user and password stuff

### connect to stock api
### read data from stock api

### potentially add and remove stocks after initial choice

### js graphs
+ bar graph
+ pie chart
+ price over time chart
+ send data to graphs from db
  + or from api to c# to db from back to the c# to js

### display user tables

### Some Tables

| Users        |                |
|--------------|----------------|
| pk,uniq, int | userId         |
| varchar      | username       |
| varchar      | password       |
| money        | userMoney      |
| date         | accountCreated |

| StockPurchaseEntry |                      |
| ------------------ | -----------          |
| pk, uniq, int      | purchaseKey          |
| fk, uniq, int      | userId               |
| varchar            | companyName          |
| int                | stockAmountPurchased |
| date               | purchaseDate         |
