import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';


const cars = [
    {id: 1, brand : "BMW", model: "M5", year: 2024}, 
    {id: 2, brand : "Mercedes - Benz", model: "E63", year: 2024}, 
    {id: 3, brand : "Audi", model: "RS 7", year: 2024} 
]

@Controller('cars')
export class CarsController {
    @Get()
    getCars(){
        return cars
    }

    @Post()
    postCars(@Body() body: any){
        cars.push(body);
        return cars
    }


    @Put(':id')
    updateCars(@Param('id') id: string, @Body() body: any) {
        const car = cars.find(c => c.id === parseInt(id))

        if (!car) {
            return { message: 'Car not found' }
        }

        Object.assign(car, body)
        return car
    }

    @Delete(':id')
    deleteCar(@Param('id') id: string) {
        const carId = parseInt(id)
        const car = cars.find(c => c.id === carId)

        if (!car) {
            return { message: 'Car not found' }
        }

        const updatedCars = cars.filter(c => c.id !== carId)
        cars.length = 0;
        cars.push(...updatedCars)

        return { message: 'Car deleted', car }
    }
}
