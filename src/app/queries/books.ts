export const allBooks = `
{
  books {
    _id
    name
    author
    category
  }
}`;

export function getBookByName(name: string) {
  return `
  {
    getBookByName(name: "${name}") {
      _id
      name
      author
      category
    }
  }`;
}

export function createBook(name: string, author: string, category: string) {
  return `
  mutation {
    createBook(name: "${name}", author: "${author}", category: "${category}") {
      _id
      name
      author
      category
    }
  }`;
}

