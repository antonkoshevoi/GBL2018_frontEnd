FROM node:latest

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install bash
WORKDIR /home/node/
COPY . /home/node/
CMD sh /home/node/entrypoint.sh
