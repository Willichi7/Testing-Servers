const { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes, blogs } = require('../utils/list_helper')

describe('test', () => {
  test('dummy returns one', () => {
    const result = dummy([])
    expect(result).toBe(1)
  })


  test('total likes', () => {
    const result = totalLikes(blogs)
    expect(result).toBe(36)
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('favourite blog', () => {
    const result = favouriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })

  test('most blogs', () => {
    const result = mostBlogs(blogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toEqual(expected)
  })

  test('most likes', () => {
    const result = mostLikes(blogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(expected)
  })
})
