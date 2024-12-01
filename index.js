import 'dotenv/config'

import myTemplate from './21239.js'


import session from 'express-session';
import express from 'express'
import path from 'path'

import { fileURLToPath } from 'url'
// const bodyParser = require('body-parser');
import bodyParser  from 'body-parser'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = process.env.PORT  || 21239


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//const db = require('./models/db')(process.env.DBSCHEMA);

import router_1  from './routes/Home_route.js'
import router_2 from './routes/Global_route.js'
import router_3 from './routes/Edit_Favor_route.js'
//const router_1 = require('./routes/Home_route')

app.use(express.static(path.join(__dirname, 'public')))

app.use(
    session({
      secret: '21127239', 
      resave: false, 
      saveUninitialized: true, 
      cookie: { secure: false } 
    })
  );


// app.use(session({
//     secret: 'hellohello',
//     resave: false,
//     saveUninitialized: false
// }))

// async function getData(){
//     const data = await fetch("http://matuan.online:2422/api/Movies");
//     const rs =  await data.json();
//     rs.forEach(async (each_data) => {
//         console.log(each_data)
//         let data_gene = each_data.genreList
//         let genes = []
//         for (let index = 0; index < data_gene.length; index++){
//             genes.push(data_gene[index].key)
//         }

//         let movie = {
//             movie_id: each_data.id,
//             movie_name: each_data.title,
//             image_link: each_data.image,
//             releasedate: each_data.year,
//             plot: each_data.plot,
//             genes: genes.toString(),
//             rating: each_data.ratings.imDb
//         }
//         console.log(movie)
//         try {
//             const rs = await db.add("Movie", movie)
//         }
//         catch(e){
//             console.log(e)
//         }
//         // console.log(each_data.id)
//         // console.log(each_data.title)
//         // console.log(each_data.year)
//         // console.log(each_data.image)
//         // console.log(each_data.plot)
//     });
    
//     //console.log(data);
//     // console.log(rs)
// }

// getData();

// async function getData(){
//     const data = await fetch("http://matuan.online:2422/api/Movies");
//     const rs =  await data.json();
//     rs.forEach(async (each_data) => {
//         console.log(each_data)
//         let data_genlist = each_data.genreList
//         let genes = []
//         for (let i = 0; i < data_genlist.length; i++){
//             genes.push(data_genlist[i].key)
//         }
//         let revenue = '0'
//         try { revenue = each_data.boxOffice.cumulativeWorldwideGross}
//         catch(e){
//             console.log(e)
//         }
//         let movie = {
//             movie_id: each_data.id,
//             movie_name: each_data.title,
//             image_link: each_data.image,
//             genes: genes,
//             year_public: each_data.year,
//             plot: each_data.plot,
//             rating: each_data.ratings.imDb,
//             revenue: parseInt(revenue.replace(/\D/g, ""), 10)
//         }
//         console.log(movie)
//         try{
//             const rs = await db.add("Movie", movie)
//         }
//         catch(e){
//             console.log(e)
//         }
//         // console.log(each_data.id)
//         // console.log(each_data.title)
//         // console.log(each_data.year)
//         // console.log(each_data.image)
//         // console.log(each_data.plot)
//     });
    
//     //console.log(data);
//     // console.log(rs)
// }

//getData();

// async function getData(){
//     const data = await fetch("http://matuan.online:2422/api/Reviews");
//     const rs =  await data.json();
//     rs.forEach(async (each_data) => {
//         let count = 1;
//         //console.log(each_data)
//         const movieID = each_data["movieId"]
//         //console.log(movieID)
//         const reviews = each_data.items;
//         reviews.forEach( async (review) => {
//             //console.log(each_data.movieID)
//             let rv = {
//                 movie_id: movieID,
//                 index_review: count,
//                 username: review.username,
//                 date: review.date,
//                 rate: review.rate,
//                 title: review.title,
//                 content_review: review.content
//             }
//             count ++;
//             const rs = await db.add("Reviews", rv)
//         })
//         // let actor = {
//         //     actor_id: each_data.id,
//         //     actor_name: each_data.name,
//         //     role_movie: each_data.role,
//         //     image_link: each_data.image,
//         //     birthdate: each_data.birthDate,
//         //     deathdate: each_data.deathDate,
//         //     summary: each_data.summary
//         // }
//         //console.log(movie)
//         //const rs = await db.add("Actor", actor)
//         // console.log(each_data.id)
//         // console.log(each_data.title)
//         // console.log(each_data.year)
//         // console.log(each_data.image)
//         // console.log(each_data.plot)
//     });
    
//     //console.log(data);
// }

async function getData(){
    const data = await fetch("http://matuan.online:2422/api/Top50Movies");
    const rs =  await data.json();
    rs.forEach(async (each_data) => {
        console.log(each_data)
        let movie = {
            movie_id: each_data.id,
            movie_rank: parseInt(each_data.rank)
        }
        console.log(movie)
        try{const rs = await db.add("Fav_Movie", movie)}
        catch(e){
            console.log(e)
        }
        // console.log(each_data.id)
        // console.log(each_data.title)
        // console.log(each_data.year)
        // console.log(each_data.image)
        // console.log(each_data.plot)
    });
    
    //console.log(data);
    // console.log(rs)
}



app.engine('html', myTemplate)

app.set('views', './views')
app.set('view engine', 'html')

app.use(router_1)
app.use(router_2)
app.use(router_3)

app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
});

app.listen(port, () => console.log(`Exmaple listening ${port}`))

//client.connect();

// app.get('/users', (req, res) => {
//     console.log("asdfasdfasdfsdf")
//     client.query("Select * from users", (err, result) => {
//         if (!err){
//             console.log("asdfasdfasdfsdf")
//             res.send(result.rows);
//         }
        
//     })
//     client.end;
// })
// client.connect();

