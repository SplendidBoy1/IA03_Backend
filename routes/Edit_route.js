import express from 'express'
import controller_1 from '../controllers/Control_Edit.js'

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

router.get('/edit_page/option', controller_1.render_option);

// router.get('/edit_page/option/delete', controller_1.render_delete);

router.get('/edit_page/option/update', controller_1.render_update);

export default router