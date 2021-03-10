const fs = require("fs");
const path = require("path");

const getAllFiles = function (dirPath, arrayOfFiles) {
	let files = fs.readdirSync(dirPath);
	// .filter((x) => x.includes("SearchMeta.ts"));

	arrayOfFiles = arrayOfFiles || [];

	files.forEach(function (file) {
		// console.log("dirpath ", dirPath);
		if (fs.statSync(dirPath + "/" + file).isDirectory()) {
			arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
		} else {
			arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
		}
	});

	return arrayOfFiles;
};

const generateSearchMetaConfig = (filePaths, jsonFileName) => {
	filePaths = filePaths.filter((x) => x.includes("SearchMeta.ts"));
	console.log(filePaths);
	// const dirPath = "../../packages/api/lib/proxy/Service";
	// const filePaths = fs
	// 	.readdirSync(dirPath)
	// 	.filter((x) => !(x.includes(".ts") || x.includes(".map")));
	// let apiConfigList = [];
	// for (let fileName of filePaths) {
	// 	console.log(fileName);
	// 	const { config } = require(fileName);
	// 	console.log(config);
	// 	apiConfigList.push(config);
	// }

	fs.writeFileSync(`./configFiles.json`, JSON.stringify(filePaths));
};

const searchMetas = getAllFiles("../../app/src/TableSearchMeta", []);

generateSearchMetaConfig(searchMetas, "bizapi");
