import Contact from "../Models/Contact.js";

export const createContact = async (req, res, next) => {
  const newContact = new Contact(req.body);

  try {
    const contact = await newContact.save();
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );

    res.status(200).json(updateContact);
  } catch (error) {
    next(error);
  }
};
