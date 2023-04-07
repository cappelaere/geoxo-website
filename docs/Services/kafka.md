# Kafka Streaming Service

Data Streaming is implemented using (Confluent Kafka)[https://www.confluent.io/]

Current interfaces are implemented using NodeJS (KafkaJS)[https://kafka.js.org/]
and the (Kafka Java Client)[https://docs.confluent.io/kafka-clients/java/current/overview.html] to integrate with OpenDCS.

Clients subscribe to topics of interest using the provided libraries.

Topics:
- [DCS Topics](/Services/KafkaTopics/dcs.topics)
- [GRB topics](/Services/KafkaTopics/grb.topics)