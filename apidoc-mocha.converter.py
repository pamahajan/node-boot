#!/usr/bin/python3.4 -tt
import sys
import subprocess
import json
import os
from pprint import pprint

intialTemplate = [
	"let Chai = require('chai');",
	"let chaitThings = require('chai-things');",
	"let expect = require('co-request');",
	"chai.use(chaiThings);"	
];

baseURl = 'http://127.0.0.1:9000';
dummyStrings = ["Bejoy", "George", "mathews", "Parth", "Mahajan", "paras", "jain", "Shah", "Rukh"];
def getJSONFromAPIDOC(inputFile): 
	apidocFolder = os.path.abspath('./temp_apidoc');
	
	status = subprocess.call([os.path.abspath('./node_modules/apidoc/bin/apidoc'), '-i', os.path.abspath(inputFile), '-o', apidocFolder]);

	if status != 0:
		print('Unable to create API Doc');
		sys.exit(1)

	jsonFilePath = apidocFolder + '/api_data.json'; 
	
	with open(jsonFilePath) as json_data:
		data = json.load(json_data)

	return data;

def createTestFile(jsonData): 
	f = open('test.spec.js', 'w');
	f.write(('\n').join(intialTemplate));
	f.write('\n');

	testCaseList = ['let url = \'' + baseURl + jsonData['url'] + '\''];
	
	testCaseList.append('describe(\'' + jsonData['title'] + '\', function(){');
	
	## for Errors
	for key in jsonData['error']['fields']: 
		currentFieldArray = jsonData['error']['fields'][key];
		testCaseList.append('it(\' returns ' + key + '\', async function(){');
		testCaseList.append('let result = request({');
		testCaseList.append('url: url, ');
		testCaseList.append('method: \'' + jsonData['type'] + '\'');
		testCaseList.append('})');

		for testCase in currentFieldArray: 
			testCaseList.append('expect( result.statusCode).to.equal(' + key.split(' ')[1] +')');
		testCaseList.append('})')
	
	testCaseList.append('})');
	f.write(('\n').join(testCaseList));
	

def convert(inputFile, outputFile): 
	jsonData = getJSONFromAPIDOC(inputFile);
	createTestFile(jsonData[0]);


def main(): 
	args = sys.argv;
	outputFile = 'spec.js';
	if (len(args) % 2 == 0 or len(args) == 1) :
		print('\n INVALID \n\n USAGE --> -i :foldername -o (optional) :testCasesFolder\n\n');
		sys.exit(1)
	elif len(args) == 3 and args[1] == '-i':
		inputFile = args[2]
	elif len(args) == 5 and args[1] == '-i' and args[3] == '-o':
		inputFile = args[2]
		outputFile = args[4]
	convert(inputFile, outputFile);

if __name__ == '__main__': 
	main()