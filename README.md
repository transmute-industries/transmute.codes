# RaptorQ Compressed QR Code Data URI Transmission

This is how it works:

```mermaid
flowchart LR
  File
  DataURI
  RaptorQ
  GZIP
  BASE45
  QRCodes

  File --> DataURI
  DataURI --> RaptorQ
  RaptorQ --> GZIP
  GZIP -> BASE45
  BASE45 --> QRCodes
```

### [message.txt](message.txt) becomes:

<img src="./message.gif" />

## License

Licensed under

 * Apache License, Version 2.0 ([LICENSE](LICENSE) or http://www.apache.org/licenses/LICENSE-2.0)

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in the work by you shall be licensed as above, without any
additional terms or conditions.

<img src="./banner.png" />

#### [Questions? Contact Transmute](https://transmute.typeform.com/to/RshfIw?typeform-source=transmute.codes)


