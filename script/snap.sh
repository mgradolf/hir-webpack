# yarn run i
yarn build
cp -r ../src/WEB-INF ../app/build
ant snapshot

# ant install.modules