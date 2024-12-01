import db_md from '../models/db.js'


const db = db_md(process.env.DBSCHEMA)

const df = {
    async load_Home(req, res){
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
    },
    pre_top5(req, res){
        req.session.top5 = (req.session.top5 - 1 + 5) % 5;
        res.redirect('/')
    },
    next_top5(req, res){
        req.session.top5 = (req.session.top5 + 1 + 5) % 5;
        res.redirect('/')
    },
    pre_rev(req, res){
        //console.log("adsfasaaa")
        //console.log(req.session.rev)
        req.session.rev = (req.session.rev - 1 + 10) % 10;
        res.redirect('/')
    },
    next_rev(req, res){
    //console.log("adsfasaaa")
        req.session.rev = (req.session.rev + 1 + 10) % 10;
        res.redirect('/')
    },
    async pre_fav(req, res){
        //console.log("adsfasaaa")
        //console.log(req.session.rev)
        let count_data = 0
        //console.log(req.body)
        try{
            count_data = await db.count("Fav_Movie")
        }
        catch(e){
            console.log(e)
        }
        count_data = parseInt(count_data[0].count)
        console.log((Math.floor((count_data/3))))
        req.session.fav = (req.session.fav - 1 + Math.floor((count_data/3) + 1)) % (Math.floor((count_data/3) + 1));
        console.log(req.session.fav)
        res.redirect('/')
    },
    async next_fav(req, res){
        //console.log("adsfasaaa")
        let count_data
        //console.log(req.body)
        try{
            count_data = await db.count("Fav_Movie")
        }
        catch(e){
            console.log(e)
        }
        count_data = parseInt(count_data[0].count)
        console.log((Math.floor((count_data/3))))
        req.session.fav = (req.session.fav + 1) % (Math.floor((count_data/3) + 1));
        console.log(req.session.fav)
        res.redirect('/')
    },
    async edit_fav(req, res){
        req.session.current_page = req.originalUrl
        //console.log(req.session.current_page)
        const mode = req.session.mode_show || false;
        let data_favorite = []
        try{
            data_favorite = await db.top_num_join("Movie", "Fav_Movie", 1000, "movie_id", "movie_rank")
        }
        catch(e){
            console.log(e)
        }
        res.render("edit_fav", {mode : mode, data_favorite: data_favorite})
    },
    async layouts_search(req, res){
        console.log(req.body.search)
        req.session.current_page = req.originalUrl
        //console.log(req.session.current_page)
        const mode = req.session.mode_show || false;
        let data_search = [] 
        try {
            data_search = await db.search_string("Movie", req.body.search, "movie_name")
        }
        catch(e){
            console.log(e)
        }
        console.log(data_search)
        res.render("layouts_search", {mode : mode, data_search: data_search})
    },

}


export default df