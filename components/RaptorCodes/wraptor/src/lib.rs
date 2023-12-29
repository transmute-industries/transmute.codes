use wasm_bindgen::prelude::*;
use raptorq::{Decoder, Encoder, EncodingPacket, ObjectTransmissionInformation};

use std::str;
use js_sys::Uint8Array;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct EncodeResult {
    pub config: [u8; 12],
    pub packets: Vec<Vec<u8>>
}

#[derive(Serialize, Deserialize)]
pub struct DecodeResult {
    pub message: Vec<u8>
}

#[wasm_bindgen]
pub fn encode(message: &Uint8Array) -> JsValue {
    let encoder = Encoder::with_defaults(&message.to_vec(), 1400);
    let config = encoder.get_config().serialize();
    // Perform the encoding, and serialize to Vec<u8> for transmission
    let packets: Vec<Vec<u8>> = encoder
        .get_encoded_packets(15)
        .iter()
        .map(|packet| packet.serialize())
        .collect();
    let result = EncodeResult {
        config,
        packets
    };
    serde_wasm_bindgen::to_value(&result).unwrap()
}

#[wasm_bindgen]
pub fn decode(js_value: JsValue) -> JsValue {
    let EncodeResult { config, mut packets }  = serde_wasm_bindgen::from_value(js_value).unwrap();
    let deserialized_config = ObjectTransmissionInformation::deserialize(&config);
    let mut decoder = Decoder::new(deserialized_config);
    let mut decoded = None;
    while !packets.is_empty() {
        decoded = decoder.decode(EncodingPacket::deserialize(&packets.pop().unwrap()));
        if decoded.is_some() {
            break;
        }
    }
    let result = DecodeResult {
        message: decoded.unwrap()
    };
    serde_wasm_bindgen::to_value(&result).unwrap()
}
