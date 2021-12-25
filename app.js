const express = require('express');
const bodyParser = require('body-parser');
const ejs =require('ejs');

const _ = require('lodash');

////////////////////////////////////////////////////////////////////////////////////////////

const homeStartingContent="skfk ifjlsf lks nfadnf n ogl oidoingoid ooidoid p;idori ooignodi godignoigoimfmpfgiomo ngigoi dgonirjo ioimgoij oi ofno oifnoisrf ofoiwnoif kfk ifjlsf lks nfadnf n ogl oidoingoid ooidoid p;idori ooignodi godignoigoimfmpfgiomo ngigoi dgonirjo ioimgoij oi ofno oifnoisrf ofoiwnoif";

const aboutContent="skfk ifjlsf lks nfadnf n ogl oidoingoid ooidoid p;idori ooignodi godignoigoimfmpfgiomo ngigoi dgonirjo ioimgoij oi ofno oifnoisrf ofoiwnoif kfk ifjlsf lks nfadnf n ogl oidoingoid ooidoid p;idori ooignodi godignoigoimfmpfgiomo ngigoi dgonirjo ioimgoij oi ofno oifnoisrf ofoiwnoif";

const contactContent="skfk ifjlsf lks nfadnf n ogl oidoingoid ooidoid p;idori ooignodi godignoigoimfmpfgiomo ngigoi dgonirjo ioimgoij oi ofno oifnoisrf ofoiwnoif kfk ifjlsf lks nfadnf n ogl oidoingoid ooidoid p;idori ooignodi godignoigoimfmpfgiomo ngigoi dgonirjo ioimgoij oi ofno oifnoisrf ofoiwnoif";

//////////////////////////////////////////////////////////////////////////////////////////////


const app = express();
const port=3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static("public"));

let posts=[];


app.get('/', (req, res) => {
    
    res.render('home',{
        home:homeStartingContent,
        posts:posts
    });
  
    
})
app.get('/about', (req, res) => {
    res.render('about',{about:aboutContent});
})
app.get('/contact', (req, res) => {
    res.render('contact',{contact:contactContent});
})
app.get('/compose', (req, res) => {
    res.render('compose');
})
app.post('/compose', (req, res) => {
    

    const post={
        title:req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(post);
    res.redirect('/');

})

app.get("/posts/:postName",(req,res)=>{
    const requestedTitle=_.lowerCase(req.params.postName);

    posts.forEach(function(post){
        const storedTitle=post.title;
        const lowerStored=_.lowerCase(storedTitle)

        if(lowerStored===requestedTitle){
            res.render("post",{
                title:post.title,
                content:post.content
            })
        }

    });
});


app.listen(port,()=>{
    console.log("Server started at port 3000");
})