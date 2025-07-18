const express=require("express")
const app=express()
const mongoose=require("mongoose")
const Listing=require("./models/listing.js")
const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust'
const path=require("path")
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate")//it works same as includes
async function main(){
    await mongoose.connect(MONGO_URL)
}
main().then(()=>{
    console.log("Connected to DB")
}).catch(err=>{
    console.log(err)
})


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate)
app.use(express.static(path.join(__dirname,"/public")))
//index route
app.get("/listings",async(req,res)=>{
    let allListings=await Listing.find({})
    res.render("listings/index.ejs",{allListings})
})
//new listing
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})
//show route 
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing })
});

//create route
app.post("/listings", async (req, res) => {
    console.log(req.body); // <-- Add this line
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// edit route 
app.get("/listings/:id/edit",async(req,res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("edit.ejs",{listing})
})

//update route
app.put("/listings/:id",async(req,res)=>{
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)

})

//delete route

app.delete("/listings/:id",async(req,res)=>{
    let { id } = req.params;
    let deletedListing= await Listing.findByIdAndDelete(id)
    console.log(deletedListing)
    res.redirect("/listings")
})
/*app.get("/testListing",async(req,res)=>{
    let sampleListing= new Listing({
        title:"My New Villa",
        description:"By the beach",
        price:1200,
        location:"calangute ,Goa",
        country:"India"
    })
    await sampleListing.save()
    console.log("Sample was saved")
    res.send("Successfull testing...")
})
*/
app.listen(8080,()=>{
    console.log("Listening...")
})
