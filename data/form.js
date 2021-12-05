const { ObjectId } = require("bson");
const mongoCollection = require("../config/mongoCollections");
const forms = mongoCollection.form;
const user = mongoCollection.users;

const addData = async (def, manage, use, userId) => {
  const formCollection = await forms();
  const userCollection = await user();

  let val = [...def, ...manage, ...use];

  let defPer = parseFloat(((def / 100) * 4).toFixed(2));
  let mTotal = 0;
  let uTotal = 0;
  manage.forEach((element) => {
    mTotal += parseInt(element);
  });
  use.forEach((element) => {
    uTotal += parseInt(element);
  });
  let managePer = parseFloat(((mTotal / (manage.length * 100)) * 4).toFixed(2));
  let usePer = parseFloat(((uTotal / (use.length * 100)) * 4).toFixed(2));
  let total = 0;
  val.forEach((value) => {
    total += parseInt(value);
  });
  const percentage = (total / (val.length * 100)) * 100;
  const percentToRange = parseFloat(((percentage / 100) * 4).toFixed(2));
  const newForm = {
    def: [def],
    manage,
    use,
    percentToRange,
    defPer,
    managePer,
    usePer,
  };

  const add = await formCollection.insertOne(newForm);
  if (add.insertedCount === 0) throw "Could not add form";
  const insertFormId = await userCollection.updateOne(
    { _id: ObjectId(userId) },
    { $set: { form: add.insertedId } }
  );
  if (insertFormId.modifiedCount === 0) throw "Could not add form";
  return await formCollection.findOne({ _id: add.insertedId });
};

const getData = async (id) => {
  const formCollection = await forms();
  const form = await formCollection.findOne({ _id: ObjectId(id) });
  if (form === null) throw "No form found";
  return form;
};

const updateData = async (def, manage, use, userId) => {
  const formCollection = await forms();
  const userCollection = await user();

  let val = [def, ...manage, ...use];
  const getFormId = await userCollection.findOne(
    { _id: ObjectId(userId) },
    { form: 1 }
  );

  let defPer = parseFloat(((def / 100) * 4).toFixed(2));
  let mTotal = 0;
  let uTotal = 0;
  manage.forEach((element) => {
    mTotal += parseInt(element);
  });
  use.forEach((element) => {
    uTotal += parseInt(element);
  });
  let managePer = parseFloat(((mTotal / (manage.length * 100)) * 4).toFixed(2));
  let usePer = parseFloat(((uTotal / (use.length * 100)) * 4).toFixed(2));
  let total = 0;
  val.forEach((value) => {
    total += parseInt(value);
  });
  const percentage = (total / (val.length * 100)) * 100;
  const percentToRange = parseFloat(((percentage / 100) * 4).toFixed(2));
  const newForm = {
    def,
    manage,
    use,
    percentToRange,
    defPer,
    managePer,
    usePer,
  };

  const add = await formCollection.updateOne(
    { _id: ObjectId(getFormId.form.toString()) },
    { $set: newForm }
  );
  if (add.updatedCount === 0) throw "Could not add form";
  return getFormId.form.toString();
};

module.exports = { addData, getData, updateData };
