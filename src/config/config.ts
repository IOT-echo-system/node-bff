export const config = {
  environment: process.env.ENVIRONMENT!,
  mqttUrl: process.env.MQTT_URL!
} as const
