
const filterBooks = (word, books) => {
  return  word.trim().length == 0
      ? books
      : books.reduce((acc, curr) => {
          return curr.title.toLowerCase().includes(word.trim().toLowerCase())
            ? [...acc, curr]
            : acc;
        }, []);
}

export default filterBooks