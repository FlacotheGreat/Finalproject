# Stock market project

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

### implement crappier starts for crappier people
+ insane fees
+ entrance exam

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
