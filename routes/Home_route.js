import express from 'express'
import controller_1 from '../controllers/Control_Home.js'

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

router.get('/', controller_1.render_home);

router.get('/get_infor', controller_1.render_information);

router.get('/edit_page', controller_1.to_edit_page);

export default router