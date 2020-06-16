### To run
1. Make sure you have [docker installed](https://www.docker.com/products/docker-desktop)
2. Make sure you have [NodeJS installed](https://nodejs.org/en/download/)
3. `npm run docker`
4. `npm run migrations`
5. `npm run populate-db`


### Helpful commands
 1. `npm run psql:dev` - Runs a psql shell for the postgres db so you can query it directly
 2. `npm run migrations` - Runs all migrations
 
### Test its working
You can test your setup is working by hitting the `http://localhost:4000/vehicles` endpoint. You should see 3 vehicles comeback in the response.