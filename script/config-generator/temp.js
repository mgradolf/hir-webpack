const fs = require("fs");
const path = require("path");

// let MarketingProgramSearchMeta = fs.readFileSync(
// 	"/Users/dsi/workspace/hir-webpack/app/src/TableSearchMeta/Offering/OfferingSearchMeta.ts",
// 	{ encoding: "utf-8" }
// );
// const regex = /fieldName:.*/g;
// let fileMap = {};
// while ((match = regex.exec(MarketingProgramSearchMeta)) != null) {
// 	let foundMatch = match[0];
// 	if (foundMatch) foundMatch = foundMatch.split('"');
// 	fileMap[foundMatch[1]] = {};
// }
// console.log(fileMap);

// let filePath =
// 	"/Users/dsi/workspace/hir-webpack/app/src/TableSearchMeta/Offering/OfferingSearchMeta.ts";

filePath = path.resolve(
	__dirname,
	"/Config/",
	"TableSearchMeta/Offering",
	"Offering.json"
);

console.log(filePath);
