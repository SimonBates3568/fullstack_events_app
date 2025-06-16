PRISMA CLI commands in order

--install prisma
npm i prisma -D

--initiate prisma
npx prisma init

(add a database, SQLite, MYSQL etc)
(add data models and modify schema)

--pushing the schema
npx prisma db push

--initiate prisma client
npm install @prisma/client

--seed the database(to add placeholder data to see it all work)(add seed command to package.json)
npx prisma db seed

--reset which resets the database schema to the original state without data inside(Replace the existing services where creation, read, update, delete (CRUD) methods are used with Prisma Client built-in functions that will take care of inserting it to the database)
npx prisma migrate reset


--run prisma studio to see GUI of the tables
npx prisma studio


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

--schema changes run
npx prisma generate

--prisma format
npx prisma format 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

prisma migrate dev 
- if we use a local database for development, this command updates this database based on the latest schema changes.

•
prisma migrate deploy 
- the functionality is the same as in case of the previous command, with the difference that this is going to update a remote (staging/production) database.

•
prisma migrate diff 
- in case of more complex scenarios, you might benefit from this command as it shows the schema differences between your Prisma Schema and the actual database schema. 
