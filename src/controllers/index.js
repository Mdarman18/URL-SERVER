import { nanoid } from "nanoid";
import newURl from "../models/index.js";

const HandleUrl = async (req, res) => {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({
      success: false,
      message: "Error in URL, please enter correct URL",
    });
  }
  try {
    new URL(body.url);
  } catch (error) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  let shortId;
  let exists = true;
  while (exists) {
    shortId = nanoid(7);
    exists = await newURl.findOne({ shortId });
  }

  await newURl.create({
    shortId: shortId,
    redirectUrl: body.url,
  });

  return res.json({ id: shortId });
};

export default HandleUrl;

// ======--------HandleRequest===================--------------\
export const HandleRequest = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await newURl.findOneAndUpdate(
      { shortId },
      {
        $push: { visitHistory: { timestamp: Date.now() } },
      },
      { new: true }
    );
    if (!entry) return res.status(404).json({ error: "ShortId not found" });
     res.json({ redirectUrl: entry.redirectUrl });
    console.log(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};
// -================HandleDetalis---------============================;
export const HandleDetalis = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const result = await newURl.findOne({ shortId });
    if (!result) return res.status(404).json({ error: "ShortId not found" });
    return res.json({
      totalClick: result.visitHistory.length,
      detalis: result.visitHistory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};
