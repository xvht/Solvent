import { XMLParser } from "fast-xml-parser";

export async function getClothingTemplate(
  assetId: string
): Promise<string | null> {
  try {
    const xmlResponse = await fetch(
      `https://assetdelivery.roblox.com/v1/asset?id=${assetId}`
    );
    const xmlText = await xmlResponse.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    });
    const result = parser.parse(xmlText);

    const item = result?.roblox?.Item;
    if (!item?.Properties?.Content) {
      return null;
    }

    const content = Array.isArray(item.Properties.Content)
      ? item.Properties.Content.find(
          (c: { [x: string]: string }) =>
            c["@_name"] === "ShirtTemplate" || c["@_name"] === "PantsTemplate"
        )
      : item.Properties.Content;

    if (!content?.url) {
      return null;
    }

    const parsedAssetId = content.url.match(/\?id=(\d+)/)?.[1];
    if (!parsedAssetId) {
      return null;
    }

    const imageResponse = await fetch(
      `https://assetdelivery.roblox.com/v1/asset?id=${parsedAssetId}`
    );
    const pngData = await imageResponse.arrayBuffer();

    const base64Data = Buffer.from(pngData).toString("base64");

    return base64Data;
  } catch (error) {
    console.error("Error fetching template:", error);
    return null;
  }
}
