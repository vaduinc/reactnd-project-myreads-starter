
export const SHELVES = ['currentlyReading','wantToRead','read']

/**
 * Updates the current shelves when a book is moved to a different shelf
 */
export function updateCurrentShelves (changedBooks,oldBooks,actualResultSearch) {
        return SHELVES.map((shelf) => {
            return changedBooks[shelf].map(function(id) { 
              let bookFound = oldBooks.find((item) => id===item.id )
              if (!bookFound && actualResultSearch){
                  bookFound = actualResultSearch.find((element) => element.id===id)
              }
              bookFound.shelf=shelf
              return bookFound
            })
          }).reduce ( (newBooks = [], col) => newBooks.concat(col)  )
    }