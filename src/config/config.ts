export const config = {
  environment: process.env.ENVIRONMENT!,
  mqttUrl: process.env.MQTT_URL!,
  mqttUsername: process.env.MQTT_USERNAME!,
  mqttPassword: process.env.MQTT_PASSWORD!
} as const
