import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';


const products = [
    {id: 1, name : "Samsung S24", category: "electronics", price: 800}, 
    {id: 2, name : "AirPods Pro", category: "electronics", price: 200}, 
    {id: 3, name : "Peanut Butter", category: "food", price: 14} 
]

@Controller('products')
export class ProductsController {
    @Get()
    getProducts(){
        return products
    }

    @Post()
    postProducts(@Body() body: any){
        products.push(body);
        return products
    }


    @Put(':id')
    updateProducts(@Param('id') id: number, @Body() body: any) {
        const product = products.find(p => p.id === Number(id))
        
        
        
        

        if (!product) {
            return { message: 'Product not found' }
        }



        Object.assign(product, body)
        return product
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        const productId = parseInt(id)
        const product = products.find(p => p.id === productId)

        if (!product) {
            return { message: 'Product not found' }
        }

        const updatedProducts = products.filter(p => p.id !== productId)
        products.length = 0;
        products.push(...updatedProducts)

        return { message: 'Product deleted', product: product }
    }
}
