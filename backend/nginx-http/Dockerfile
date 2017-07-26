FROM nginx:alpine

MAINTAINER SidMorad <saeid3@gmail.com>

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

COPY default.conf /etc/nginx/conf.d/default.conf
COPY hosts /etc/hosts
# Note: above line has no effect!
# because /etc/hosts will get override by docker after contianer initialization,
# to check it run following command:
# docker exec $(docker inspect --format="{{.Id}}" rahpey-nginx-http-only) cat /etc/hosts
