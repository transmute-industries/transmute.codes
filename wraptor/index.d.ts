
export interface RaptorEncodingResult {
  config: Uint8Array,
  packets: Uint8Array[]
}

export interface RaptorDecodingResult {
  message: Uint8Array,
}

export interface Raptor {
  encode: (message: Uint8Array) => RaptorEncodingResult
  decode: (encoded: RaptorEncodingResult) => RaptorDecodingResult
}
