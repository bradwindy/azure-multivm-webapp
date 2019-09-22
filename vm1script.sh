#!/bin/bash
git clone https://github.com/bradwindy/azure-multivm-webapp.git

cd azure-multivm-webapp/

mv vm-1 ../vm-1

cd ..

rm -rf azure-multivm-webapp/

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

sudo apt-get update

sudo apt-get install -y nodejs

cd vm-1

npm install

npm run build