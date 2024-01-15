import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';

const app = express()
const port = 4040

app.use(express.json())
app.use(cors())

const jobSchema = new mongoose.Schema({
    name: String,
    category: String,
    img: String
});

const Job = mongoose.model('Job', jobSchema);

app.get('/', async (req, res) => {
    try {
        const jobs = await Job.find({})
        res.send(jobs)
    } catch (error) {
        res.send(error.message)
    }
})



app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const job = await Job.findById(id)
        res.send(job)
    } catch (error) {
        res.send(error.message)
    }
})

app.post('/', async (req, res) => {
    try {
        const { name, category, img } = req.body
        const newJob = new Job({ name, category, img })
        await newJob.save()
        res.send(newJob)
    } catch (error) {
        res.send(error.message)
    }
})

app.put('/:id', (req, res) => {
    res.send('Got a PUT request at /user')
})

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const job = await Job.findByIdAndDelete(id)
        res.send(job)
    } catch (error) {
        res.send(error.message)
    }
})


mongoose.connect('mongodb+srv://arzu:arzu@cluster0.9p2kmwb.mongodb.net/')
    .then(() => console.log('Connected!'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})