import db_md from '../models/db.js'


const db = db_md(process.env.DBSCHEMA)

const df = {
    async switch_mode(req, res){
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
    },
}


export default df