# yarn run i
yarn build
cp -r ./WEB-INF ../app/build
ant snapshot

# ant install.modules