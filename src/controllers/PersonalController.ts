import Account from "../modal/Account";
import express from "express";

const PersonalController = {
  UploadProfile: async (req: express.Request, res: express.Response) => {
    try {
      const uid = req.body.uid;
      const photoUrl = req.body.photoUrl;
      const upload = await Account.findOneAndUpdate(
        { uid },
        { photoUrl },
        { new: true }
      );
      if (upload) {
        return res.status(200).send("upload image successfully!");
      }
    } catch (error) {}
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
      if (changed) {
        return res.status(200).send(true);
      }
      return res.status(200).send(false);
    } catch (error) {}
  },
  DeleteAccount: async (req: express.Request, res: express.Response) => {
    try {
      const uid = req.body.uid;
      const changed = await Account.findOneAndDelete({
        uid,
      });
      if (changed) {
        return res.status(200).send(true);
      }
      return res.status(200).send(false);
    } catch (error) {}
  },
};
export default PersonalController;
