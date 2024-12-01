import express from 'express'
import controller_1 from '../controllers/edit_favor_controller.js'

const router = express.Router();

// app.get('/', async (req, res) => {
//     res.render('home', {result: 0})
// })

// app.get('/confirm', async (req, res) => {
    
//     res.render('confirm', {result: 0})
// })

// app.get('/view', async (req, res) => {
//     res.render('views', {data_list: data_list});
//     // res.send("qqqqqqqqqqqqqqqqqqq")
// })

router.post('/add_fav_movie', controller_1.add_fav)
router.post('/remove_fav_movie', controller_1.remove_fav)
// router.get('/get_infor', controller_1.render_information);

// router.get('/edit_page', controller_1.to_edit_page);

export default router