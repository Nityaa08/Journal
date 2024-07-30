import express from 'express';
const app = express();
const port = 3000;

let posts = [
    { id: 1, title: 'Greetings', content: 'Welcome to your own journal! You can now create entries as well.' },
    { id: 2, title: 'First Entry', content: 'You can start by editing this entry. Good luck!' }
];

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.get('/new', (req, res) => {
    res.render('newpost');
});

app.post('/create', (req, res) => {
    const { title, content } = req.body;
    const id = posts.length + 1; 
    posts.push({ id, title, content });
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const post = posts.find(p => p.id === parseInt(id));
    if (!post) return res.send('Post not found');
    res.render('editpost', { post });
});

app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const index = posts.findIndex(p => p.id === parseInt(id));
    if (index === -1) return res.send('Post not found');
    posts[index].title = title;
    posts[index].content = content;
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    posts = posts.filter(p => p.id !== parseInt(id));
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
