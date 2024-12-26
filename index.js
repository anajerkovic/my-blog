import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];


app.get("/", (req,res) => {
    res.render("index.ejs", {
        posts:posts,
    });
});

app.post("/submit", (req, res) => {
    const post = {
        id: posts.length + 1,
        title: req.body["postTitle"],
        content: req.body["postContent"],
    };
    posts.push(post);
    res.redirect('/');
  });

app.get("/create", (req,res) => {
    res.render("create.ejs");
});

app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    console.log(req.params.id);
    if (post) {
        res.render('post.ejs', { post: post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/delete/:id', (req, res) => {
    const postId = req.params.id;
    const postIndex = posts.findIndex(p => p.id == postId);

    if (postIndex > -1) {
        posts.splice(postIndex, 1); // Remove the post from the array
    }
    res.redirect('/');
});


app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    console.log(req.params.id);

    if (post) {
        res.render("edit.ejs", { post: post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);

    if (post) {
        post.title = req.body.postTitle;
        post.content = req.body.postContent;
    }
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
