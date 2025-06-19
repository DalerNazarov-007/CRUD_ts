import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { ProductsModule } from './products/products.module';
import { MoviesModule } from './movies/movies.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [CarsModule, ProductsModule, MoviesModule, BooksModule],
})
export class AppModule {}
