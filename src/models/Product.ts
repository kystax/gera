import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this product.'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    price: {
        type: String,
        required: [true, 'Please provide a price.'],
    },
    category: {
        type: String,
        required: [true, 'Please specify a category.'],
        enum: ['bridal', 'dresses', 'pants', 'tops', 'skirts'],
    },
    image: {
        type: String,
        required: [true, 'Please provide an image URL.'],
    },
    desc: {
        type: String,
        required: [true, 'Please provide a description.'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    stock: {
        type: Number,
        default: 10,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Since we are using custom IDs in the frontend, we can add a virtual id or just use the _id
// For consistency with existing code, let's keep a numeric/string id field if needed, 
// but MongoDB's _id is better. Let's add an 'originalId' field for the migration.
ProductSchema.add({
    pid: {
        type: String,
        unique: true
    }
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
