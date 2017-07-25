#!/usr/bin/python3.4 -tt
import sys
import subprocess
import json
import os
from pprint import pprint

def convert(inputFile, outputFile): 
	#f = open(inputFile);
	apidocFolder = os.path.abspath('./temp_apidoc');
	# generateAPIDoc = os.path.abspath('./node_modules/apidoc/bin/apidoc -i') + ' ' + os.path.abspath(inputFile) + ' -o ' + apidocFolder;
	# print(generateAPIDoc);
	
	status = subprocess.call([os.path.abspath('./node_modules/apidoc/bin/apidoc'), '-i', os.path.abspath(inputFile), '-o', apidocFolder]);

	if status != 0:
		print('Unable to create API Doc');
		sys.exit(1)

	jsonFilePath = apidocFolder + '/api_data.json'; 
	
	with open(jsonFilePath) as json_data:
		data = json.load(json_data)
	

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