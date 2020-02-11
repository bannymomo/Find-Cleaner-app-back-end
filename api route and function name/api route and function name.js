/*

USER

post        localhost:4000/api/users/              function addUser
need password,username,role from req.body

put         localhost:4000/api/users/user:Id       function updateUser
need userId from req.params, 
need oldPassword, newPassword, doublecheckPassword from req.body



AUTH
post        localhost:4000/api/auth                function loginUser
need username, password from req.body



CLIENT      
post        localhost:4000/api/clients             function addClient
need firstName, lastName, gender, age, email, postcode, memberSince, lastOnline, photo, 
description from req.body  (userId can get from req.user---decoded form token)

get         localhost:4000/api/clients/:clientId   function getClient
need clientId from req.params

put         localhost:4000/api/clients/:clientId   function updateClient
need firstName, lastName, gender, age, email, postcode, memberSince, lastOnline, photo, 
description from req.body
need clientId from req.params

get         localhost:4000/api/clients/:clientId/orders   function getHisOrders

// client only can get their own orders and can sort by status
need clinetId, status... from req.query


BUSINESS
post        localhost:4000/api/businesses               function addBusiness
need businessName, address, email, postcode, telephoneNumber, ABNNumber, memberSince, lastOnline,
photo, description from req.body  (userId can get from req.user---decoded form token)

get         localhost:4000/api/businesses/:businessId   function getBusiness
need businessId from req.params

get         localhost:4000/api/businesses               function getAllBusinesses

put         localhost:4000/api/businesses/:businessId   function updateBusiness
need businessName, address, email, postcode, telephoneNumber, ABNNumber, memberSince, lastOnline,
photo, description from req.body 
need businessId from req.params


get         localhost:4000/api/businesses/:businessId/orders   function getHisOrders

// business can get their own orders and can sort by status
need businessId, status... from req.query


ORDER
get         localhost:4000/api/orders/:orderId      function getOrder
need orderId from req.params

post        localhost:4000/api/orders               functoin addOrder
need postBy, location, budget, dueDate, description from req.body 
need clientId from req.query

put         localhost:4000/api/orders/:orderId      function updateOrder



get         localhost:4000/api/orders/              function getOrdersByQuery

//business can get all orders with status = "new"



order have 5 status: 
[NEW]
when client create an order, then add relationship between order and client

[CANCELLEDBYCLIENT]
after client create an order--client can cancel it

[ACCEPTED]
after client create an order and client doesn't cancel it, business can accept it, 
then add relationship between business and order

[CANCELLEDBYBUSINESS]
after business accept an order--business can cancel it

[DONE]
after business accept an order, client can change the status to "done"

patch       localhost:4000/api/orders/:orderId/clients/:clientId       
function updateOrderStatusByClient
need orderId, clientId from req.params
need status from req.query
// client can change status to "cancelledByClient" or "done"

patch       localhost:4000/api/orders/:orderId/businesses/:businessId  
function updateOrderStatusByBusiness
need orderId, businessId from req.params
need status from req.query
// business can change status to "cancelledByBusiness" or "accepted"


*/
