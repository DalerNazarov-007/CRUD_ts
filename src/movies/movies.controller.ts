import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';


const movies = [
    {id: 1, name : "Momento", genre: "fiction, drama", releasedYear: 2010}, 
    {id: 2, name : "Inception", genre: "fiction, adventure", releasedYear: 2012}, 
    {id: 3, name : "Interstellar", genre: "fiction, documentary, drama", releasedYear: 2015} 
]

@Controller('movies')
export class MoviesController {
    @Get()
    getMovies(){
        return movies
    }

    @Post()
    postMovies(@Body() body: any){
        movies.push(body);
        return movies
    }


    @Put(':id')
    updateMovies(@Param('id') id: string, @Body() body: any) {
        const movie = movies.find(m => m.id === parseInt(id))

        if (!movie) {
            return { message: 'Movie not found' }
        }

        Object.assign(movie, body)
        return movie
    }

    @Delete(':id')
    deleteMovie(@Param('id') id: string) {
        const movieId = parseInt(id)
        const movie = movies.find(m => m.id === movieId)

        if (!movie) {
            return { message: 'Movie not found' }
        }

        const updatedMovies = movies.filter(m => m.id !== movieId)
        movies.length = 0;
        movies.push(...updatedMovies)

        return { message: 'Movie deleted', movie: movie }
    }
}
