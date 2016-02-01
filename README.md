# couchcms
CMS in Couchbase and Node.JS

Couchbase 4.1 as CMS

Please refer all the npms in package.json

winstone is used to log all the logs

Please create a database "couchcms" in your couchbase and fire below command on cbq to set primary index else your CMS won't work
CREATE PRIMARY INDEX ON couchcms USING GSI

This is real life multi language CMS on couchbase.

FRONT END - AngularJS (all the files inside public/ are front ends codes in angularjs)
BACKEND - Node.JS, Express.JS, 
DB - Couchbase 4.1 using N1QL

Start node server by node app.js

Some reference URLs (local)
http://localhost:8000/#/  - Default site page
http://localhost:8000/user/login - Login (use test@test.com/test credentials. This is hard code as of now)
http://localhost:8000/cms/edit/en-in/home - Language specific url to edit

In case of any queries, please send me emails to grakesh18@gmail.com 





