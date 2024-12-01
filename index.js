require('dotenv').config()

const myTemplate = require('./21239.js')


const session = require('express-session');
const express =  require('express')
const path = require('path');

const bodyParser = require('body-parser');




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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


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

//getData()
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

// app.get('/', (req, res) => {
//     req.session.mode_show = false
//     req.session.favorite = []
//     req.session.top5 = 0
//     req.session.rev = 0
//     req.session.fav = 0
//     // res.send("Success in session")
// })

app.get('/', async (req, res) => {
    req.session.current_page = req.originalUrl
    const mode = req.session.mode_show || false;
    //const favor = req.session.favorite || [];
    const index_top5 = req.session.top5 || 0;
    const index_toprev = req.session.rev || 0;
    const index_topfav = req.session.fav || 0;
    let data_top5 = []
    let top_revenue = [];
    let top_fav = []
    if (req.session.data_top5 == undefined){
        req.session.rev = 0
        req.session.top5 = 0
        req.session.fav = 0
        
    }

    try {
        data_top5 = await db.top_num("Movie", 5, 'rating')
        top_revenue = await db.top_num("Movie", 30, 'revenue')
        top_fav = await db.top_num_join("Movie", "Fav_Movie", 30, "movie_id", "movie_rank")
        req.session.data_top5 = data_top5
        req.session.data_rev = top_revenue
        req.session.data_fav = top_fav
    }
    catch(e){
        console.log(e)
    }
    //console.log(req.session.rev)
    //console.log(index_top5)
    //console.log(top_fav)
    res.render("main", {mode : mode, data_top5: data_top5[index_top5], top_rev: top_revenue.slice(3*index_toprev, 3*(index_toprev+ 1)), top_fav: top_fav.slice(3*index_topfav, 3*(index_topfav + 1))})
})

app.get('/edit_fav', async (req, res) => {
    req.session.current_page = req.originalUrl
    console.log(req.session.current_page)
    const mode = req.session.mode_show || false;
    let data_favorite = []
    try{
        data_favorite = await db.top_num_join("Movie", "Fav_Movie", 1000, "movie_id", "movie_rank")
    }
    catch(e){
        console.log(e)
    }
    res.render("edit_fav", {mode : mode, data_favorite: data_favorite})
})

app.post('/switch_mode', (req, res) => {
    //console.log(req.body)
    if (req.body.switch == "on"){
        req.session.mode_show = true
        //req.session.top5 = 3
        console.log("aaaaa")
    }
    else{
        console.log("bbbb")
        //req.session.top5 = 1
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
    // console.log("1111111111111111")
    console.log(req.session.current_page)
    res.redirect(req.session.current_page)
    // return res.status(400)
    // res.send("Success in switch")
})

app.post('/pre_top5', (req, res) => {
    
    req.session.top5 = (req.session.top5 - 1 + 5) % 5;
    res.redirect('/')
})

app.post('/next_top5', (req, res) => {
    //console.log("adsfasaaa")
    req.session.top5 = (req.session.top5 + 1 + 5) % 5;
    res.redirect('/')
})

app.post('/pre_rev', (req, res) => {
    //console.log("adsfasaaa")
    //console.log(req.session.rev)
    req.session.rev = (req.session.rev - 1 + 10) % 10;
    res.redirect('/')
})

app.post('/next_rev', (req, res) => {
    //console.log("adsfasaaa")
    
    req.session.rev = (req.session.rev + 1 + 10) % 10;
    res.redirect('/')
})


app.post('/pre_fav', (req, res) => {
    //console.log("adsfasaaa")
    //console.log(req.session.rev)
    req.session.fav = (req.session.fav - 1 + 10) % 10;
    res.redirect('/')
})

app.post('/next_fav', (req, res) => {
    //console.log("adsfasaaa")
    req.session.fav = (req.session.fav + 1 + 10) % 10;
    res.redirect('/')
})
//app.use('/user', require('./routes/user_router.js'));

app.post('/add_fav_movie', async (req, res) => {
    //console.log(req.body)
    const count_data = await db.count("Fav_Movie")
    //console.log(count_data)
    console.log("123123123")
    let movie = {
        movie_id: req.body.add_id,
        movie_rank: parseInt(count_data[0].count) + 1,
    }
    console.log(movie)
    try{
        const rs = await db.add("Fav_Movie", movie)
    }
    catch(e){
        console.log(e);
    }
    res.redirect('/edit_fav')
})

app.post('/remove_fav_movie', async (req, res) => {
    console.log(req.body)
    try{
        const rs = await db.delete_and_update_rank("Fav_Movie", req.body.id_btn, "movie_id")
    }
    catch(e){
        console.log(e);
    }
    res.redirect('/edit_fav')
})

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

