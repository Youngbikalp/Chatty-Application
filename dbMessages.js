import mongoose from 'mongoose';

const whatsappSchema = mongoose.Schema({
    message: String,
    name: String, //also use name to push the messages
    timestamp: String,
    received: Boolean,
});


//collection
export default mongoose.model('messagecontents', whatsappSchema);
