import Account from "../modal/Account";
import express from "express";

const PersonalController = {
  UploadProfile: async (req: express.Request, res: express.Response) => {
    const uid = req.body.uid;
    const photoUrl = req.body.photoUrl;
    const upload = await Account.findOneAndUpdate(
      { uid },
      { photoUrl },
      { new: true }
    );
    if (upload) {
      return res.send("upload image successfully!");
    }
    return res.send("failure");
  },

  DisplayNameChange: async (req: express.Request, res: express.Response) => {
    try {
      const uid = req.body.uid;
      const displayName = req.body.displayName;
      const changed = await Account.findOneAndUpdate(
        {
          uid,
        },
        {
          displayName,
        }
      );

      return res.send(true);
    } catch (error) {}
  },
  DeleteAccount: async (req: express.Request, res: express.Response) => {
    try {
      const uid = req.body.uid;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      console.log(firstname, lastname);
      const changed = await Account.findOneAndDelete({
        uid,
      });
      return res.send(true);
    } catch (error) {}
  },
  AccountCheck: async (req: express.Request, res: express.Response) => {
    try {
      const uid = req.body.uid;
      const upload = (await Account.findOne({ uid })) as any;

      if (upload) {
        const { password, ...other } = upload._doc;
        return res.json({ ...other });
      }
      return res.status(404).send("failure");
    } catch (error) {
      return res.send(error);
    }
  },
};
export default PersonalController;
