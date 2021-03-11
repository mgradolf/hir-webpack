const fs = require("fs");
const path = require("path");

const fileNameSuffixFilter = "SearchMeta.ts";
const rootDirectory = "../../app/src/TableSearchMeta";

const getAllFiles = function (dirPath, arrayOfFiles) {
	let files = fs.readdirSync(dirPath);
	arrayOfFiles = arrayOfFiles || [];
	files.forEach(function (file) {
		if (fs.statSync(dirPath + "/" + file).isDirectory()) {
			arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
		} else {
			arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
		}
	});

	return arrayOfFiles;
};

const processFile = (filePath) => {
	let MarketingProgramSearchMeta = fs.readFileSync(filePath, {
		encoding: "utf-8",
	});
	const regex = /fieldName:.*/g;
	let fileMap = {};
	while ((match = regex.exec(MarketingProgramSearchMeta)) != null) {
		let foundMatch = match[0];
		if (foundMatch) foundMatch = foundMatch.split('"');
		fileMap[foundMatch[1]] = {};
	}
	return fileMap;
};

const createNewFilePathString = (oldFilePath) => {
	let filePath = oldFilePath;
	filePath = path.parse(filePath).dir;
	filePath = filePath.split(path.sep);
	filePath = "/Config/" + filePath.slice(filePath.indexOf("src") + 1).join("/");
	return filePath;
};

const getFileName = (filePath) => {
	return path.basename(filePath, ".ts");
};

const createNewFile = (newPath, fileName, content) => {
	console.log("with dir ", __dirname + newPath);
	fs.mkdirSync(__dirname + newPath, { recursive: true });

	newPath = path.resolve(newPath, fileName);
	console.log("all params ", newPath, fileName, content);
	fs.writeFileSync(__dirname + newPath + ".json", JSON.stringify(content));
};

const fileMap = {};

// const absolutePathOfAllFiles = getAllFiles(rootDirectory, []).filter((x) =>
// 	x.includes(fileNameSuffixFilter)
// );
const absolutePathOfAllFiles = [
	"/Users/dsi/workspace/hir-webpack/app/src/TableSearchMeta/Membership/MembershipSearchMeta.ts",
	"/Users/dsi/workspace/hir-webpack/app/src/TableSearchMeta/Offering/OfferingSearchMeta.ts",
];
absolutePathOfAllFiles.forEach((path) => {
	const fieldNameMap = processFile(path);
	const newFilePath = createNewFilePathString(path);
	const newFileName = getFileName(path);
	createNewFile(newFilePath, newFileName, fieldNameMap);
	fileMap[newFileName] = newFilePath;
});

createNewFile("/Config", "fileMap.json", fileMap);
