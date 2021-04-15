import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: { type: String, required:true },
    rating: { type: Number, required:true },
    comment: { type: String, required:true }
}, {
    timestamps: true,
})

const recipeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    backgroundImage: {
         type: String
        },
    time: {
        type: Number,
        required: true
    },
    servings:{
        type: Number,
        required: true,
    },
    ingredientes: [
        {
            name: String,
            quantity: String,
            image: String
        },
        {timestamps: true}
    ],
    instructions: [
        {
            heading: String,
            steps: String
        },
        {timestamps: true}
    ],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewsSchema],
    numReviews: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe