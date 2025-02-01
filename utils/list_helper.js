const blogs = [
   {
     _id: "5a422a851b54a676234d17f7",
     title: "React patterns",
     author: "Michael Chan",
     url: "https://reactpatterns.com/",
     likes: 7,
     __v: 0
   },
   {
     _id: "5a422aa71b54a676234d17f8",
     title: "Go To Statement Considered Harmful",
     author: "Edsger W. Dijkstra",
     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
     likes: 5,
     __v: 0
   },
   {
     _id: "5a422b3a1b54a676234d17f9",
     title: "Canonical string reduction",
     author: "Edsger W. Dijkstra",
     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
     likes: 12,
     __v: 0
   },
   {
     _id: "5a422b891b54a676234d17fa",
     title: "First class tests",
     author: "Robert C. Martin",
     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
     likes: 10,
     __v: 0
   },
   {
     _id: "5a422ba71b54a676234d17fb",
     title: "TDD harms architecture",
     author: "Robert C. Martin",
     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
     likes: 0,
     __v: 0
   },
   {
     _id: "5a422bc61b54a676234d17fc",
     title: "Type wars",
     author: "Robert C. Martin",
     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
     likes: 2,
     __v: 0
   }  
 ]


const dummy = (array) => {
   return array.length = 1
}


const totalLikes = (blog) => {
   const reducer = (sum , item ) => {
      return sum + item
   }
   const likes  = blog.map((like) => {
      return like.likes
   })

   return likes.length == 0 ? 
   0
   :likes.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
   if(blogs.length == 0){
      return null
   }
 
   return blogs.reduce((favourite, blogs) => {
      return blogs.likes > favourite.likes ? blogs : favourite
   }, blogs[0])
   
 }

 const mostBlogs = (blogs) => {
   if(blogs.length == 0 ){
      return null
   }

   const blogsCount = {}

   blogs.map(blog => {
      if(!blogsCount[blog.author]){
         blogsCount[blog.author] = 0
      }
      blogsCount[blog.author]++
   });

   let topAuthor = {
      author : '',
      blogs: 0
   }

   for(const author in blogsCount){
      if(blogsCount[author] > topAuthor.blogs){
         topAuthor = {
            author: author,
            blogs: blogsCount[author]
         }
      }
   }
   return topAuthor

 }


 const mostLikes = (blogs) => {
   if (blogs.length === 0) {
     return null;
   }
 
   const blogsCount = {};
 
   // Count likes per author
   blogs.map(blog => {
     if (!blogsCount[blog.author]) {
       blogsCount[blog.author] = 0;
     }
     blogsCount[blog.author] += blog.likes;
   });
 
   // Find author with most likes
   let topLikes = {
     author: '',
     likes: 0,
   };
 
   for (const author in blogsCount) {
     if (blogsCount[author] > topLikes.likes) {
       topLikes = {
         author: author,
         likes: blogsCount[author],
       };
     }
   }
 
   return topLikes;
 };
 


module.exports = {
   blogs,
   dummy,
   totalLikes,
   favouriteBlog,
   mostBlogs,
   mostLikes
}