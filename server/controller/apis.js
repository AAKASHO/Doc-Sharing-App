
import Document from '../schema/Schema.js'

export const getDocument = async (id) => {
    if (id === null) return;

    const document = await Document.findById(id);

    if(document) return document;

    return await Document.create({ _id: id, data: "" })
}

export const updateDocument = async (id, data) => {
    // console.log("called");
    const doc=Document.findById(id);
    // console.log(doc);
    // console.log(data.ops);
    return await Document.findByIdAndUpdate(id, { data });
}