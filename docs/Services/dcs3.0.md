# DCS On the Cloud

DCS is now available on the GeoCloud.

## Getting started
Download OpenDCS from [GitHub](https://github.com/opendcs/opendcs)
and follow the Quick Start guide.

## LRGS connection
GeoCloud is providing the same interface as [LRGS](https://opendcs-env.readthedocs.io/en/latest/lrgs-userguide.html) (DCP data Service).
For more information, refer to the [NOAA GOES DCS page](https://dcs1.noaa.gov/)

Please configure your system to connect to our published IP address: 54.227.193.198

## Request Username/Password
Current demo does not require a username/password.  Connections are not autneticated.
Eventually, to connect to our geoCloud DCS stream, you would need a username and password.
Please request this information from our [administrator](mailto:admin@geoxo.io).

## OpenDCS Client installation notes
Installation requires: Java 11, ant, python3.
Documentation on how to use OpenDCS is available [here](https://opendcs-env.readthedocs.io/en/latest/index.html)

```
$ git clone https://github.com/opendcs/opendcs.git
$ ant jar
$ ant opendcs
```
This will create a jar installation file in $DCSTOOL_HOME/stage/opendcs-ot-x.x.x.jar

```
java -jar opendcs-ot-x.x.x.jar
```
Choose all defaults
In installtion directory, edit lrgs.conf and ddsrecv.conf with the GeoCloud host ip (54.227.193.198)
```
export DCSTOOL_HOME=[opendcs path]
```
and add it to your path.

in the bin directory, run opendcs_user_init
and start 
```
launcher_start 
```

select lrgs status and connect to provide IP Address
## DCS Query Examples Using API
See [Browser Query Examples](/query)<br/>




