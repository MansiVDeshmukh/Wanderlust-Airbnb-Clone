const mongoose=require("mongoose")
const Schema=mongoose.Schema

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    price:Number,
    image:{
        type:String,
        default:"https://ik.imagekit.io/5tgxhsqev/saffronstays-media/image/upload/defzogw9ubbm4lhuk91p?tr=w-800,h-460,q-62,f-webp",
        set:(v)=>v===" "?"https://ik.imagekit.io/5tgxhsqev/saffronstays-media/image/upload/defzogw9ubbm4lhuk91p?tr=w-800,h-460,q-62,f-webp":v
    },
    location:String,
    country:String
})

const Listing=mongoose.model("Listing",listingSchema)
module.exports=Listing