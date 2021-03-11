const fs = require("fs");
const path = require("path");

// const fileNameSuffixFilter = "SearchMeta.ts";
const rootDirectory = "../../app/src";

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

const processMetaFile = (filePath) => {
	let fileContentString = fs.readFileSync(filePath, {
		encoding: "utf-8",
	});
	const regex = /fieldName:.*/g;
	let fileMap = {};
	while ((match = regex.exec(fileContentString)) != null) {
		let foundMatch = match[0];
		if (foundMatch) foundMatch = foundMatch.split('"');
		fileMap[foundMatch[1]] = {};
	}
	return fileMap;
};

const processCustomFormFile = (filePath) => {
	let fileContentString = fs.readFileSync(filePath, {
		encoding: "utf-8",
	});
	const regex = /fieldNames:.*(\n.*)*"\n\}/g;
	let fileMap = {};
	const match1 = regex.exec(fileContentString);
	if (match1) {
		const regex2 = /\{(\n.*)*\}/g;
		let match2 = regex2.exec(match1[0]);
		match2 = match2[0].split('"');
		match2 = match2.filter((x, i) => i % 2 === 1);
		match2.forEach((x) => {
			fileMap[x] = {};
		});
	}
	//
	return fileMap;
};

const createNewFilePathString = (oldFilePath) => {
	let filePath = oldFilePath;
	filePath = path.parse(filePath).dir;
	filePath = filePath.split(path.sep);
	filePath = "/Config/" + filePath.slice(filePath.indexOf("src") + 1).join("/");
	return filePath;
};

const mergeObjects = (obj1, obj2) => {
	for (key in obj2) {
		if (!obj1[key]) {
			obj1[key] = obj2[key];
		}
	}

	for (key in obj1) {
		if (!obj2[key]) {
			delete obj1[key];
		}
	}
	return obj1;
};

const createNewFile = (newPath, fileName, content) => {
	fs.mkdirSync(__dirname + newPath, { recursive: true });

	newPath = path.resolve(newPath, fileName);
	newPath = __dirname + newPath + ".json";
	if (fs.existsSync(newPath)) {
		let previousContent = fs.readFileSync(newPath, {
			encoding: "utf-8",
		});
		previousContent = JSON.parse(previousContent);
		content = mergeObjects(previousContent, content);
	}

	fs.writeFileSync(newPath, JSON.stringify(content));
};

const createMetaDrivenFormConfigs = () => {
	const fileMap = {};
	const allFilePaths = getAllFiles(rootDirectory, []);
	const absolutePathOfAllMetaFiles = allFilePaths.filter(
		(x) => x.includes("Meta.ts") || x.includes("Meta.tsx")
	);

	absolutePathOfAllMetaFiles.forEach((filepath) => {
		const fieldNameMap = processMetaFile(filepath);
		const newFilePath = createNewFilePathString(filepath);
		const newFileName = path.basename(filepath, ".ts");
		createNewFile(newFilePath, newFileName, fieldNameMap);
		fileMap[newFileName] = newFilePath + ".json";
	});

	const absolutePathOfAllCustomFormFiles = allFilePaths.filter((x) =>
		x.includes("WithConfig.tsx")
	);

	absolutePathOfAllCustomFormFiles.forEach((filepath) => {
		const fieldNameMap = processCustomFormFile(filepath);
		const newFilePath = createNewFilePathString(filepath);
		const newFileName = path.basename(filepath, ".tsx");
		createNewFile(newFilePath, newFileName, fieldNameMap);
		fileMap[newFileName] = newFilePath + ".json";
	});

	createNewFile("/Config", "fileMap", fileMap);
};

createMetaDrivenFormConfigs();
