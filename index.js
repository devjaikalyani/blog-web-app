import express from "express";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
}); 

app.get("/about", (req,res) => {
  res.render("about.ejs");
})

app.get("/faqs", (req,res) => {
  res.render("faqs.ejs");
})

app.set('view engine', 'ejs');

app.set("views", path.join(__dirname, "views"));

let blogs = [];

app.get("/create", (req,res) => {
  res.render("create.ejs");
})

app.post('/create', async (req, res) => {
    const { title, content, author } = req.body;
 
    const newBlogPost = {
      id: blogs.length + 1,
      title,
      content,
      publishDate: new Date(),
      author,
      visibility: 'public'
    };

    blogs.push(newBlogPost);
    res.redirect('/explore');
});

app.get('/explore', (req, res) => {
    const publicBlogs = blogs.filter(blog => blog.visibility === 'public');

  res.render('explore', { blogs: publicBlogs });
});

app.get('/blogs/:id', (req, res) => {
  const blogId = parseInt(req.params.id);
  const blog = blogs.find(blog => blog.id === blogId);

  if (!blog) {
    return res.status(404).send('Blog not found');
  }

  res.render('blog-detail', { blog });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;