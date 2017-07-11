FROM docker.elastic.co/beats/metricbeat:5.4.0

COPY dashboards/ /tmp

ENV ELASTICSEARCH_URL=http://jhipster-elasticsearch:9200

CMD /usr/share/metricbeat/scripts/import_dashboards -es $ELASTICSEARCH_URL -dir /tmp/