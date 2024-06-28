import express from "express"
import dotenv, { config } from "dotenv"
dotenv(config)
const app = express();

app.use(express.json())

app.use("*",(req,res)=>{
    res.send(`<div>
            <h1 style="text-align:center;">404 Not Found</h1>
        </div>`)
})

const plants = [
    {
        id : 1, 
        name : "Mango",
        category : "Outdoor",
        image : "https://cdn.shopify.com/s/files/1/2083/6855/products/how-to-grow-a-mango-tree-in-pot-1.jpg?v=1499122159" ,
        price : 600,
        description : "Native Earth Alphonso Mango Grafted Fruit Plant Height 3 Feet, Pack Of 1 Tree"
    },
    {
        id: 2,
        name: "Guava",
        category: "Outdoor",
        image: "https://m.media-amazon.com/images/I/61Xjo1OqD2L._SX300_SY300_QL70_FMwebp_.jpg",
        price: 450,
        description: "Guava Kg Guava - Fruit Plants & Tree"
    },
    {
        id: 3,
        name: "Pineapple",
        category: "Outdoor",
        image: "https://m.media-amazon.com/images/I/61VyapEjUjL.jpg",
        price: 300,
        description: "Mphmi Seedless Plant Fruit Plant Pineapple Plant"
    }
]
app.post("/plant", (req,res)=>{
    const {  name, category , image , price , description   } = req.body

    if(!name){
        return res.json({
            success : false,
            data : null,
            message : "Name is requred !"
        })
    }
    if(!category){
        return res.json({
            success : false,
            data : null,
            message : "Category is requred !"
        })
    }
    if(!image){
        return res.json({
            success : false,
            data : null,
            message : "Image is requred !"
        })
    }
    if(!price){
        return res.json({
            success : false,
            data : null,
            message : "Price is requred !"
        })
    }
    if(!description){
        return res.json({
            success : false,
            data : null,
            message : "Description is requred !"
        })
    }
    const randomID = Math.round(Math.random() * 10000)

    const newPlant = {
        id : randomID,
        name : name,
        category : category,
        image : image ,
        price : price,
        description : description
    }

    plants.push(newPlant)

    res.json({
        success : true,
        data : newPlant,
        message : "New plant added successfully...!"
    })
})

app.get("/plants", (req,res)=>{
    res.json({
        success : true,
        data : plants,
        message : "Plants data fetched successfully...!"
    })
})

app.get("/plant/:id", (req,res)=>{
    const {id} =req.params

    const plant = plants.find((p)=>{
        return p.id == id
    })

    res.json({
        success : plant ? true : false,
        data : id,
        message : plant ?  "Plant data fetched" : "Plant not found"
    })
})

app.put("/plant/:id", (req,res)=>{
    const {  name, category , image , price , description   } = req.body

    const {id} =req.params

    let index = -1
    plants.forEach((plant,i)=>{
        if (plant.id == id) {
            index = i
        }
    })

    const newObj = {
        id,
        name,
        category, 
        image,
        price,
        description
    }

    if(index == -1){
        return   res.json({
                        success : false,
                        data : null,
                        message : "Plant not found" ,
                    })
    }
    else{
        plants[index] = newObj

        return  res.json({
            success : true,
            data : newObj,
            message : "Plant data updated" ,
        })
    }
})

app.delete("/plant/:id",(req,res)=>{
    const {id} =req.params
    
    let index = -1
    plants.forEach((plant,i)=>{
        if (plant.id == id) {
            index = i
        }
    })

    if (index == -1) {
        return res.json({
            success : false,
            message : `Plant not found of id  ${id} `
        })        
    }

    plants.splice(index,1)

    res.json({
        success : true,
        data : null,
        message : "Plant data Deleted Successfully..!" ,
    })

})

const PORT = process.env.PORT

app.listen(PORT, (req,res)=>{
    console.log(`Server started on port ${PORT}`)
})