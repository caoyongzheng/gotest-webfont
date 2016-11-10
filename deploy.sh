#! /bin/bash

Webfont=/Users/caoyongzheng/Projects/webapps/gotest-webfont
ServerUrl=root@107.170.210.111

cd $Webfont

echo 'build assets'
npm run prod

echo 'upload assets'
scp -r $Webfont/assets  $ServerUrl:/gotest/assets
