# Docs
The heart of this project lives in the `docker-compose.yml` file, where two ElasticSearch and one Kibana instances are defined.
```YAML
services:
  #...
  es01:
  image: "docker.elastic.co/elasticsearch/elasticsearch-oss:7.10.2"
  ports:
    - "9200:9200"
    - "9300:9300"
  environment:
    node.name: es01
    discovery.seed_hosts: es01,es02
    cluster.initial_master_nodes: es01,es02
    cluster.name: elastic_cluster
    bootstrap.memory_lock: "true"
    ES_JAVA_OPTS: -Xms256m -Xmx256m
  volumes:
    - "es01-data:/usr/share/elasticsearch/data"
  ulimits:
    memlock:
      soft: -1
      hard: -1
  healthcheck:
    test: [ "CMD-SHELL", "curl http://localhost:9200" ]
    interval: 10s
    timeout: 10s
    retries: 40
  #...
    kibana:
    image: "docker.elastic.co/kibana/kibana-oss:7.10.2"
    depends_on:
      es01:
        condition: service_healthy
      es02:
        condition: service_healthy
    ports:
      - "5601:5601"
    environment:
      - 'ELASTICSEARCH_HOSTS=["http://es01:9200","http://es02:9200"]'

volumes:
  es01-data:
  es02-data:
```

### Elasticsearch Services (`es01`, `es02`)

- **Image:**
    - `docker.elastic.co/elasticsearch/elasticsearch-oss:7.10.2`: Specifies the Elasticsearch Docker image and its version. Using version `7.10.2` because this is the latest open source version.

- **Ports:**
    - `"9200:9200"`: Maps the Elasticsearch HTTP REST API port (used for requests).
    - `"9300:9300"`: Maps the Elasticsearch transport port (used for the communication between nodes within the cluster).

- **Environment:**
1. **`node.name`:**
    - **Description:** Specifies the name of the Elasticsearch node.
    - **Example:** `node.name: es02`
2. **`discovery.seed_hosts`:**
    - **Description:** Defines the seed hosts for the node discovery process. Seed hosts are used for Elasticsearch nodes to find each other in the cluster.
    - **Example:** `discovery.seed_hosts: es01,es02`
3. **`cluster.initial_master_nodes`:**
    - **Description:** Identifies the initial master nodes in the Elasticsearch cluster. These nodes participate in the election of the cluster's master node.
    - **Example:** `cluster.initial_master_nodes: es01,es02`
4. **`cluster.name`:**
    - **Description:** Specifies the name of the Elasticsearch cluster.
    - **Example:** `cluster.name: elastic_cluster`
5. **`bootstrap.memory_lock`:**
    - **Description:** Ensures that Elasticsearch's memory is locked (prevented from swapping to disk). This is essential for Elasticsearch's performance, especially in production environments.
    - **Example:** `bootstrap.memory_lock: "true"`
6. **`ES_JAVA_OPTS`:**
    - **Description:** Sets Java options for the Elasticsearch Java Virtual Machine (JVM). In this case, it sets the initial and maximum heap size for Elasticsearch.
    - **Example:** `ES_JAVA_OPTS: -Xms256m -Xmx256m`
    - **Explanation:**
        - `-Xms256m`: Sets the initial heap size to 256 megabytes.
        - `-Xmx256m`: Sets the maximum heap size to 256 megabytes.

- **Volumes:**
    - `"es01-data:/usr/share/elasticsearch/data"`, `"es02-data:/usr/share/elasticsearch/data"`: Maps Elasticsearch data directories to named volumes. This ensures that data is persisted even if containers are stopped or removed.

- **Ulimits:**
    - **Description**: Specifies the memory lock ulimit, preventing Elasticsearch from swapping memory to disk. The values `-1` for both soft and hard limits indicate an unlimited memory lock.

- **Healthcheck:**
    - Performs a health check using a cURL command to check if Elasticsearch is responsive. This health check is performed every 10 seconds with a timeout of 10 seconds, and it retries up to 40 times.

### Kibana Service (`kibana`)

- **Image:**
    - `docker.elastic.co/kibana/kibana-oss:7.10.2`: Specifies the Kibana Docker image and its version. Again using the version `7.10.2` because its open source

- **Depends On:**
    - Ensures that Kibana starts only when all Elasticsearch nodes (`es01`, `es02`) are healthy.

- **Ports:**
    - `"5601:5601"`: Maps the Kibana web interface port.

- **Environment:**
    - `'ELASTICSEARCH_HOSTS=["http://es01:9200","http://es02:9200"]'`: Specifies the Elasticsearch hosts that Kibana should connect to. It includes all two Elasticsearch nodes.

### Volumes

- Two named volumes (`es01-data`, `es02-data`) are defined for persisting Elasticsearch data.

This setup creates a basic Elasticsearch cluster with two nodes and a Kibana instance that connects to the cluster. It uses named volumes to persist Elasticsearch data and ensures that Kibana starts only when all Elasticsearch nodes are healthy. Adjustments can be made based on specific requirements, such as increasing memory limits, adjusting network settings, or adding more Elasticsearch nodes for scalability.