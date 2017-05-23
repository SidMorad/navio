FROM phusion/baseimage:0.9.22

# Use baseimage-docker's init system.
CMD ["/sbin/my_init"]

RUN mkdir /home/ots
COPY Ubuntu-16.sh /home/ots/Ubuntu-16.sh
RUN chmod +x /home/ots/Ubuntu-16.sh
RUN bash /home/ots/Ubuntu-16.sh web carto http://download.geofabrik.de/asia/iran-latest.osm.pbf

COPY Ubuntu-16-Reload.sh /home/ots/Ubuntu-16-Reload.sh
RUN chmod +x /home/ots/Ubuntu-16-Reload.sh
COPY docker-entrypoint.sh /home/ots/docker-entrypoint.sh
RUN chmod +x /home/ots/docker-entrypoint.sh

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENTRYPOINT ["/home/ots/docker-entrypoint.sh"]