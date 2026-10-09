
  export const create = async ({model,data = [{}], options = { validateBeforeSave: true }} = {}) => {
    return await model.create(data, options)
  }


  
    export const createOne = async ({model,data = {},options = { validateBeforeSave: true }}) => {
    const [doc] = await create({ model:model, data: [data], options:options });
    return doc
  }





 export const insertMany = async ({model,data}) => {
    return await model.insertMany(data)
  }












export const findOne = async ({ model, filter = {},options = {} }) => {
    const doc = model.findOne(filter)
    if(options.select){
      doc.select(options.select)
    }
    if (options.populate) {
      doc.populate(options.populate)
    }
    if (options.lean) {
      doc.lean()
    }
    return await doc.exec()
  }
  







  



  
  export const findById = async ({
    id,
    options = {},
    model
  }) => {
    const doc = model.findById(id)
   if(options.select){
      doc.select(options.select)
    }
    if (options.populate) {
      doc.populate(options.populate);
    }
    if (options.lean) {
      doc.lean(options.lean);
    }
    return await doc.exec();
  }
  
 
  
  export const updateOne = async ({
    filter,
    update,
    options,
    model
  } = {}) => {
    return await model.updateOne(
      filter || {},
      { ...update, $inc: { __v: 1 } },
      options
    );
  }
  

export const updateMany = async ({
  filter,
  update,
  options,
  model
} = {}) => {
  return await model.updateMany(
    filter || {},
    { ...update, $inc: { __v: 1 } },
    options
  );
};






  export const findOneAndUpdate = async ({
    filter,
    update,
    options,
    model
  } = {}) => {
    return await model.findOneAndUpdate(
      filter || {},
      { ...update, $inc: { __v: 1 } },
      {
        new: true,
        runValidators: true,
        ...options,
      }
    );
  }
  
  export const findByIdAndUpdate = async ({
    id,
    update,
    options = { new: true },
    model
  }) => {
    return await model.findByIdAndUpdate(
      id,
      { ...update, $inc: { __v: 1 } },
      options
    );
  }
  









export const deleteOne = async ({
  filter,
  options,
  model
} = {}) => {
  return await model.deleteOne(
    filter || {},
    options
  );
};













export const deleteMany = async ({
  filter,
  options,
  model
} = {}) => {
  return await model.deleteMany(
    filter || {},
    options
  );
};










  export const findOneAndDelete = async ({
    filter,
    model
  } = {}) => {
    return await model.findOneAndDelete(
      filter || {},
    );
  }
