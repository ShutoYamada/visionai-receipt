import * as functions from "firebase-functions";
import vision from "@google-cloud/vision";

// Vision AI クライアントの作成
const client = new vision.ImageAnnotatorClient();

export const analyzeReceipt = functions.https.onRequest(async (req, res) => {
  try {
    // テスト用の画像ファイルのパス
    const filePath = "gs://my-test-bucket-20250105/receipt-test.jpg";

    // Vision APIでのテキスト認識
    const [result] = await client.textDetection(filePath);
    const detections = result.textAnnotations;

    // ログに結果を出力
    console.log("Text detections:", detections);

    // レスポンスとして認識結果を返す
    res.status(200).send(detections);
  } catch (error) {
    console.error("Error processing the image:", error);
    res.status(500).send("Failed to analyze the image.");
  }
});
