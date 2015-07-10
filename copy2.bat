cd ./target/football3x3-1.0-SNAPSHOT/
#tar -czf upload.tar * --exclude=resources --exclude=WEB-INF/dataSource.xml
tar -czf upload.tar * --exclude=WEB-INF/dataSource.xml
#tar -czf upload.tar * 

scp -rp upload.tar root@185.65.246.228:/opt/apache-tomcat-8.0.24/webapps/ROOT/

rm upload.tar

ssh root@185.65.246.228 "cd /opt/apache-tomcat-8.0.24/webapps/ROOT/ && tar -xzf upload.tar && rm upload.tar"

ssh root@185.65.246.228 "service tomcat restart"

ssh root@185.65.246.228 'tail -f /opt/apache-tomcat-8.0.24/logs/catalina.out'