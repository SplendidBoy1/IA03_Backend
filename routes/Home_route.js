import express from 'express'
import controller_1 from '../controllers/home_controller.js'

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


router.get('/', controller_1.load_Home);
router.post('/pre_top5', controller_1.pre_top5)
router.post('/next_top5', controller_1.next_top5)
router.post('/next_rev', controller_1.next_rev)
router.post('/pre_rev', controller_1.pre_rev)
router.post('/pre_fav', controller_1.pre_fav)
router.post('/next_fav', controller_1.next_fav)
router.get('/edit_fav', controller_1.edit_fav)
router.post('/layouts_search', controller_1.layouts_search);
// router.get('/get_infor', controller_1.render_information);

// router.get('/edit_page', controller_1.to_edit_page);

export default router