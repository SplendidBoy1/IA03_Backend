import db_md from '../models/db.js'


const db = db_md(process.env.DBSCHEMA)

const df = {
    async add_fav(req, res){
        let count_data
        //console.log(req.body)
        try{
            count_data = await db.count("Fav_Movie")
        }
        catch(e){
            console.log(e)
        }
        
        //console.log(count_data)
        //console.log("123123123")
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
    },
    async remove_fav(req, res){
        console.log(req.body)
        try{
            const rs = await db.delete_and_update_rank("Fav_Movie", req.body.id_btn, "movie_id", "movie_rank")
        }
        catch(e){
            console.log(e);
        }
        res.redirect('/edit_fav')
    }
}   



export default df