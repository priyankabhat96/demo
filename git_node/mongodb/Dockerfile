from ubuntu:18.04

RUN apt-get update
RUN apt-get install curl gnupg2 -y
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
RUN echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.0.list 
RUN apt-get update
RUN apt-get install -y mongodb-org

COPY ./mongod.conf /etc/mongod.conf
RUN mkdir -p /var/lib/mongo
CMD mongod -f /etc/mongod.conf
