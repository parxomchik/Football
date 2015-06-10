cd ./target/football3x3-1.0-SNAPSHOT/
#tar -czf upload.tar *
tar -czf upload.tar * --exclude=WEB-INF/dataSource.xml
#tar -czf upload.tar * --exclude=resources

scp -rp upload.tar 556755035004463013000143@football3x3-kws.rhcloud.com:app-root/dependencies/jbossews/webapps/ROOT/

rm upload.tar

ssh 556755035004463013000143@football3x3-kws.rhcloud.com "cd app-root/dependencies/jbossews/webapps/ROOT/ && tar -xzf upload.tar && rm upload.tar"

ssh 556755035004463013000143@football3x3-kws.rhcloud.com "echo 1 | gear restart"

ssh -t 556755035004463013000143@football3x3-kws.rhcloud.com 'tail */log*/*'