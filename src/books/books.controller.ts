import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { title } from 'process';


const books = [
    {id: 1, title : "Angels & Demons", author: "Dan Brown", publishedYear: 2010}, 
    {id: 2, title : "Bygone Days", author: "Abdulla Qodiriy", publishedYear:1979}, 
    {id: 3, title : "Digital Fortress", author: "RS 7", publishedYear: 2008} 
]

@Controller('books')
export class BooksController {
    @Get()
    getBooks(){
        return books
    }

    @Post()
    postBooks(@Body() body: any){
        books.push(body);
        return books
    }


    @Put(':id')
    updateBooks(@Param('id') id: string, @Body() body: any) {
        const book = books.find(b => b.id === parseInt(id))

        if (!book) {
            return { message: 'Book not found' }
        }

        Object.assign(book, body)
        return book
    }

    @Delete(':id')
    deleteBook(@Param('id') id: string) {
        const bookId = parseInt(id)
        const book = books.find(b => b.id === bookId)

        if (!book) {
            return { message: 'Book not found' }
        }

        const updatedBooks = books.filter(b => b.id !== bookId)
        books.length = 0;
        books.push(...updatedBooks)

        return { message: 'Book deleted', book: book }
    }
}
