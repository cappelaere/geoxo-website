# Kafka Streaming Service

Data Streaming is implemented using [Confluent Kafka](https://www.confluent.io/)

Current interfaces are implemented using NodeJS [KafkaJS](https://kafka.js.org/)
and the [Kafka Java Client]](https://docs.confluent.io/kafka-clients/java/current/overview.html) to integrate with OpenDCS.

Clients subscribe to topics of interest using the provided libraries.

Topics:
- [DCS Topics](/docs/Services/KafkaTopics/dcs_topics)
- [GRB topics](/docs/Services/KafkaTopics/grb_topics)

## Consumer Client Example to ingest DCP's

Note: This documentation is a customized version for OpenDCS from [Confluent](https://developer.confluent.io/get-started/java/?_ga=2.208418196.721733913.1680876031-546330187.1673014188&_gac=1.22395977.1680876031.Cj0KCQjw_r6hBhDdARIsAMIDhV9gIxCM-mQF8s-wjHfBH66pSVdbNmJiOBuS6xJJQ01OG0wvSkkimWoaAjI4EALw_wcB)

### Prerequisites

This guide assumes that you already have:

- Gradle installed
- Java 11 installed and configured as the current Java version for the environment. Verify that java -version outputs version 11 and ensure that the JAVA_HOME environment variable is set to the Java installation directory containing bin.- 

### Configuration

Copy and paste the following configuration data into a file named kafka.properties.
Please contact admin@geoxo.io to obtain the proper values for:
- BOOTSTRAP_SERVER
- API_KEY
- API_SECRET

```
bootstrap.servers=BOOTSTRAP_SERVER
security.protocol=SASL_SSL
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required username='API_KEY' password='API_SECRET';
sasl.mechanism=PLAIN

# Required for correctness in Apache Kafka clients prior to 2.6
client.dns.lookup=use_all_dns_ips

# Best practice for Kafka producer to prevent data loss
acks=all
key.serializer=org.apache.kafka.common.serialization.StringSerializer
value.serializer=org.apache.kafka.common.serialization.StringSerializer
key.deserializer=org.apache.kafka.common.serialization.StringDeserializer
value.deserializer=org.apache.kafka.common.serialization.StringDeserializer

```

### Build the Consumer
- Paste the following [Gradle file](build.gradle.txt) into a file called build.gradle.  Note: you might need to adjust the location of your opendcs.jar file.

- Paste the following [Java code](ConsumerExample.java) into a file located at src/main/java/examples/ConsumerExample.java

- Create a local archive folder to store the messages.  You could also specify in the code the location of your current OpenDCS archive

- Compile and build a jar file using these commands:
```
gradle build
gradle jar
gradle shadowjar
```
And you should see
```
BUILD SUCCESSFUL
```

- Run Sample Consumer using this command:
```
java -cp build/libs/kafka-java-getting-started-0.0.1.jar examples.ConsumerExample dcs.goes.NOANOS
```
Subscription with wildcards:
```
java -cp build/libs/kafka-java-getting-started-0.0.1.jar examples.ConsumerExample ^dcs.goes.*
```
Subscription to multiple topics:
```
java -cp build/libs/kafka-java-getting-started-0.0.1.jar examples.ConsumerExample dcs.goes.NOAANOS,dcs.goes.NOAAFS
```
### OpenDCS Integration Notes
The messages will be stored in the specified local archive folder.  This should aloow you to read and process the messages using OpenDCS