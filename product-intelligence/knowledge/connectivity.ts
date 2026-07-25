export interface ConnectivityDefinition {
  value: string;
  aliases: string[];
}

export const CONNECTIVITY_DEFINITIONS: ConnectivityDefinition[] = [
  {
    value: "Wi-Fi",
    aliases: [
      "Wi-Fi",
      "WiFi",
      "Wireless LAN",
      "WLAN",
    ],
  },
  {
    value: "Bluetooth",
    aliases: ["Bluetooth"],
  },
  {
    value: "GPS",
    aliases: ["GPS"],
  },
  {
    value: "Cellular",
    aliases: ["Cellular"],
  },
  {
    value: "LTE",
    aliases: ["LTE"],
  },
  {
    value: "5G",
    aliases: ["5G"],
  },
  {
    value: "4G",
    aliases: ["4G"],
  },
  {
    value: "USB-C",
    aliases: [
      "USB-C",
      "USB C",
      "Type-C",
      "Type C",
    ],
  },
  {
    value: "Ethernet",
    aliases: ["Ethernet"],
  },
  {
    value: "NFC",
    aliases: ["NFC"],
  },
];