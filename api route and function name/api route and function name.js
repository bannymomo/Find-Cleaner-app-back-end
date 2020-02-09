/*

USER

post        localhost:4000/api/users/              function addUser
need password,username,role from req.body

put         localhost:4000/api/users/user:Id       function updateUser
need userId from req.params, oldPassword, newPassword, doublecheckPassword from req.body



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








*/
