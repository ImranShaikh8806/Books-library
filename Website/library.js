const showFormBtn = document.getElementById("addBtn");
const formContainer = document.getElementsByClassName("add-book-form")[0];
const form = document.getElementById("book-form");

let books = [];

showFormBtn.addEventListener("click",()=>{
    formContainer.classList.toggle("active");
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const name = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isread").checked;

    let randomNumber =Math.floor( Math.random() * 1000000) ;

    const bookObject = {
        name,
        author,
        pages,
        isRead,
        bookId: randomNumber
    }

    books.push(bookObject);

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("isread").checked = false;

    createBookCard(bookObject);
    
    formContainer.classList.toggle("active");
    
})


function createBookCard(currentBook){
    const booksContainer = document.getElementsByClassName("books-container")[0];

    const bookCard =  document.createElement("div");
    bookCard.classList.add("book-card");

    const titleSpan = document.createElement("span");
    titleSpan.innerText = currentBook.name;
    
    const authorSpan = document.createElement("span");
    authorSpan.innerText = currentBook.author;

    const pagesSpan = document.createElement("span");
    pagesSpan.innerText = currentBook.pages;

    const isReadButton = document.createElement("button");
    isReadButton.setAttribute("onClick",`changeReadStatus(${currentBook.bookId})`);
    isReadButton.innerText = currentBook.isRead ? "Completed" : "Not Completed";
    if(currentBook.isRead){
        isReadButton.classList.add("Read")
    }else{
        isReadButton.classList.add("NotRead")

    }
    
    
    const deletButton = document.createElement("button");
    deletButton.setAttribute("onClick",`deletBook(${currentBook.bookId})`);
    deletButton.innerText = "Delete Book";
    deletButton.classList.add("deleteBtn")


    bookCard.appendChild(titleSpan);
    bookCard.appendChild(authorSpan);
    bookCard.appendChild(pagesSpan);
    bookCard.appendChild(isReadButton);
    bookCard.appendChild(deletButton);


    booksContainer.appendChild(bookCard);

}


function changeReadStatus(myBookId){
    
    const book = books.find(book=>{
       return book.bookId == myBookId;
    })
    book.isRead = !book.isRead;

    updateBooksContainer()
}

function deletBook(myBookId){
   
    books = books.filter(book=>{
        if(book.bookId == myBookId){
        }else{
            return book;
        }
        
    })

    updateBooksContainer();
  
}

function updateBooksContainer(){
    const booksContainer = document.getElementsByClassName("books-container")[0];
    booksContainer.innerHTML = "";
    books.forEach(book =>{
        createBookCard(book);
    })
}
