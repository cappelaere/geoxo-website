# Content-based Addressing

Traditionally, location-based addressing (url) is used to retrieve data.
In our system, data location is transient depending on retention policy and organizational responsibilities.
Users should not need to know the implementation details of the infrstructure.
Implementation and storage solutions will change over time.
Following the example of Web 3.0, data is retrieved based on a content id (CID).   The CID is based on a cryptographic hash of the file contents.