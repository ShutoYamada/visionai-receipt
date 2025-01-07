import express from "express";
import asyncHandler  from "express-async-handler";
import vision from "@google-cloud/vision";

const app = express();
app.use(express.json());

// Vision AI クライアントの作成
const client = new vision.ImageAnnotatorClient();


// 画像のテキスト検出エンドポイント
app.post("/analyze-receipt", asyncHandler(async (req, res) => {
  try {
    const { filePath } = req.body;

    if (!filePath) {
      res.status(400).send({ error: "filePath is required" });
    }
    else {
      // Vision APIでのテキスト認識
      const [result] = await client.textDetection(filePath);
      const detections = result.textAnnotations;

      // レスポンスとして認識結果を返す
      res.status(200).send(detections);
    }
    
  } catch (error) {
    console.error("Error processing the image:", error);
    res.status(500).send({ error: "Failed to analyze the image." });
  }
}));

// サーバーの起動
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});