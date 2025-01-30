
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
   dummy,
   totalLikes,
   favouriteBlog,
   mostBlogs,
   mostLikes
}