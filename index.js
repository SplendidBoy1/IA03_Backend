require('dotenv').config()

const myTemplate = require('./21239.js')


const session = require('express-session');
const express =  require('express')
const path = require('path');
// const { getDefaultHighWaterMark } = require('stream');


// const initOptions = {capSQL : true}

// const pgp = require('pg-promise')(initOptions)
// // const client = require('./connection.js')

// const cn = {
//     host: process.env.DBHOST || "localhost",
//     port: process.env.DBPORT || 5433,
//     database: process.env.DBNAME || 'progres',
//     user: process.env.DBUSER || 'progres',
//     password: process.env.DBPASSWORD || "rootUser",
// }

//const db = pgp(cn);

const app = express();
const port = process.env.PORT  || 21239


app.use(express.urlencoded({ extended: true }));

const db = require('./models/db')(process.env.DBSCHEMA);

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

async function getData(){
    const data = await fetch("http://matuan.online:2422/api/Movies");
    const rs =  await data.json();
    rs.forEach(async (each_data) => {
        console.log(each_data)
        let data_gene = each_data.genreList
        let genes = []
        for (let index = 0; index < data_gene.length; index++){
            genes.push(data_gene[index].key)
        }

        let movie = {
            movie_id: each_data.id,
            movie_name: each_data.title,
            image_link: each_data.image,
            releasedate: each_data.year,
            plot: each_data.plot,
            genes: genes.toString(),
            rating: each_data.ratings.imDb
        }
        console.log(movie)
        try {
            const rs = await db.add("Movie", movie)
        }
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

// getData();


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

// async function getData(){
//     const data = await fetch("http://matuan.online:2422/api/Top50Movies");
//     const rs =  await data.json();
//     rs.forEach(async (each_data) => {
//         console.log(each_data)
//         let movie = {
//             movie_id: each_data.id,
//             movie_rank: each_data.rank,
//             rating: each_data.imDbRating
//         }
//         console.log(movie)
//         const rs = await db.add("Top50_Movie", movie)
//         // console.log(each_data.id)
//         // console.log(each_data.title)
//         // console.log(each_data.year)
//         // console.log(each_data.image)
//         // console.log(each_data.plot)
//     });
    
//     //console.log(data);
//     // console.log(rs)
// }

// async function getData(){
//     const data = await fetch("http://matuan.online:2422/api/MostPopularMovies");
//     const rs =  await data.json();
//     rs.forEach(async (each_data) => {
//         console.log(each_data)
//         let movie = {
//             movie_id: each_data.id,
//             movie_rank: each_data.rank,
//             rating: each_data.imDbRating
//         }
//         console.log(movie)
//         const rs = await db.add("Popular_Movie", movie)
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
//console.log(data);


app.engine('html', myTemplate)

// app.engine('hbs', hbs.engine);
app.set('views', './views')
app.set('view engine', 'html')

// app.use(express.urlencoded({ extended: false }));

//const db = require('./models/db')('abc');

// app.get('/', (req, res) => {
//     // console.log(req.session);
//     // console.log(req.sessionID)
//     //req.session.visited = true;
//     // res.cookie('c1', 'abc').render('layouts/main', {
//     //             pcss: () => 'css/bs'
//     //         })

// })

// app.get('/', (req, res) => {
//     res.cookie('c1', 'abc').render('index', {
//         pcss: () => 'css/bs'
//     })
// })

// app.get('/login', (req, res) => {
//     app.render("asdfasdf")
// })

app.get('/', (req, res) => {
    req.session.mode_show = false
    req.session.favorite = []
    req.session.top5 = 1
    req.session.popular = 1
    req.session.rating = 1
    // res.send("Success in session")
})

app.get('/landingpage', async (req, res) => {
    const mode = req.session.mode_show || false;
    const favor = req.session.favorite || [];
    const index_top5 = req.session.top5 || 1;
    let data_top5 = [];
    try {
        data_top5 = await db.top_num("Movie", 5, 'rating')
    }
    catch(e){
        console.log(e)
    }
    //console.log(index_top5)
    //console.log(data_top5[index_top5])
    res.render("main", {mode : mode, favor: favor, data_top5: data_top5[index_top5]})
})

app.post('/switch_mode', (req, res) => {
    console.log(req.body)
    if (req.body.switch == "on"){
        req.session.mode_show = true
        console.log("aaaaa")
    }
    else{
        console.log("bbbb")
        req.session.mode_show = false
    }
    //req.session.mode_show = true
    // if (req.body.hasOwnProperty("switch")){
    //     req.session.mode_show = true
    // }
    // else{
    //     req.session.mode_show = false
    // }
    // const mode = req.session.mode_show || false;
    // const favor = req.session.favorite || [];
    res.redirect('/landingpage')
    // return res.status(400)
    // res.send("Success in switch")
})

//app.use('/user', require('./routes/user_router.js'));

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

